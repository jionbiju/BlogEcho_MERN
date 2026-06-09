import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userContext } from '../Context/context';
import { getPostsByUser, deletePost } from '../api/postServices';
import { updateProfile } from '../api/userServices';
import { getImageUrl } from '../api/config';
import Navbar from '../components/Navbar';

const Profile = () => {
    const { user, setUser } = useContext(userContext);
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({ username: '', bio: '' });
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState('');
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        if (user) {
            setProfileData({ username: user.username || '', bio: user.bio || '' });
            fetchPosts();
        }
    }, [user]);

    const fetchPosts = async () => {
        setLoadingPosts(true);
        try {
            const data = await getPostsByUser(user.userId);
            setPosts(data);
        } catch {
            toast.error('Failed to load your posts');
        } finally {
            setLoadingPosts(false);
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) { toast.error('Avatar must be under 2MB'); return; }
        if (!file.type.startsWith('image/')) { toast.error('Please select a valid image'); return; }
        setAvatarFile(file);
        const reader = new FileReader();
        reader.onload = () => setAvatarPreview(reader.result);
        reader.readAsDataURL(file);
    };

    const handleProfileSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const data = new FormData();
            data.append('username', profileData.username.trim());
            data.append('bio', profileData.bio.trim());
            if (avatarFile) data.append('profilePic', avatarFile);

            const updated = await updateProfile(data);
            setUser(updated);
            setIsEditing(false);
            setAvatarFile(null);
            toast.success('Profile updated!');
        } catch {
            toast.error('Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const handleDeletePost = async (postId) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;
        setDeletingId(postId);
        try {
            await deletePost(postId);
            setPosts(prev => prev.filter(p => p._id !== postId));
            toast.success('Post deleted');
        } catch {
            toast.error('Failed to delete post');
        } finally {
            setDeletingId(null);
        }
    };

    // image URL resolution handled by shared config utility

    const avatarUrl = avatarPreview || getImageUrl(user?.profilePic);

    const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);
    const totalLikes = posts.reduce((sum, p) => sum + (p.likes || 0), 0);

    return (
        <div className="min-h-screen bg-slate-900">
            <Navbar />
            <div className="max-w-5xl mx-auto px-4 py-10">
                {/* Back link */}
                <Link to="/" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-100 text-sm mb-6 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Home
                </Link>
                {/* Profile Header */}
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 sm:p-8 mb-8">
                    {!isEditing ? (
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                            {/* Avatar */}
                            <div className="relative flex-shrink-0">
                                {avatarUrl ? (
                                    <img
                                        src={avatarUrl}
                                        alt={user?.username}
                                        className="w-24 h-24 rounded-full object-cover border-4 border-slate-600"
                                    />
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold border-4 border-slate-600">
                                        {user?.username?.[0]?.toUpperCase()}
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 text-center sm:text-left">
                                <h1 className="text-2xl font-bold text-slate-100 mb-1">{user?.username}</h1>
                                <p className="text-slate-400 text-sm mb-1">{user?.email}</p>
                                <p className="text-slate-300 mt-3">{user?.bio || 'No bio yet.'}</p>

                                {/* Stats */}
                                <div className="flex flex-wrap gap-6 mt-4 text-sm">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-slate-100">{posts.length}</p>
                                        <p className="text-slate-500">Posts</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-slate-100">{totalViews.toLocaleString()}</p>
                                        <p className="text-slate-500">Total Views</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-slate-100">{totalLikes}</p>
                                        <p className="text-slate-500">Total Likes</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-5 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-lg text-sm font-medium transition-colors border border-slate-600 self-start"
                            >
                                ✏️ Edit Profile
                            </button>
                        </div>
                    ) : (
                        /* Edit Mode */
                        <form onSubmit={handleProfileSave} className="space-y-5">
                            <h2 className="text-xl font-bold text-slate-100 mb-4">Edit Profile</h2>

                            {/* Avatar upload */}
                            <div className="flex items-center gap-5">
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt="avatar" className="w-20 h-20 rounded-full object-cover border-4 border-slate-600" />
                                ) : (
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold border-4 border-slate-600">
                                        {user?.username?.[0]?.toUpperCase()}
                                    </div>
                                )}
                                <div>
                                    <input type="file" id="avatar" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                                    <label htmlFor="avatar" className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-md text-sm cursor-pointer transition-colors border border-slate-600">
                                        Change Avatar
                                    </label>
                                    <p className="text-xs text-slate-500 mt-1">Max 2MB</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
                                <input
                                    type="text"
                                    value={profileData.username}
                                    onChange={e => setProfileData(p => ({ ...p, username: e.target.value }))}
                                    className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-md text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Bio</label>
                                <textarea
                                    value={profileData.bio}
                                    onChange={e => setProfileData(p => ({ ...p, bio: e.target.value }))}
                                    rows={3}
                                    className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-md text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    placeholder="Tell readers about yourself..."
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => { setIsEditing(false); setAvatarFile(null); setAvatarPreview(''); }}
                                    className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-md text-sm transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-medium rounded-md text-sm transition-colors"
                                >
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Posts Section */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-100">Your Posts</h2>
                    <button
                        onClick={() => navigate('/createpost')}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        + New Post
                    </button>
                </div>

                {loadingPosts ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-slate-800 rounded-xl border border-slate-700 p-4 animate-pulse">
                                <div className="h-32 bg-slate-700 rounded-md mb-3" />
                                <div className="h-4 bg-slate-700 rounded w-3/4 mb-2" />
                                <div className="h-3 bg-slate-700 rounded w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-16 bg-slate-800/50 rounded-xl border border-slate-700">
                        <p className="text-slate-400 text-lg mb-3">You haven't written any posts yet.</p>
                        <button
                            onClick={() => navigate('/createpost')}
                            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                        >
                            Write Your First Post
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {posts.map((post) => (
                            <div key={post._id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-slate-600 transition-all">
                                {post.image && (
                                    <img
                                        src={getImageUrl(post.image)}
                                        alt={post.title}
                                        className="w-full h-36 object-cover"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                )}
                                <div className="p-5">
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        <h3 className="font-semibold text-slate-100 line-clamp-2 leading-snug">{post.title}</h3>
                                        <span className="px-2 py-0.5 bg-slate-700 text-slate-400 text-xs rounded-full flex-shrink-0">{post.category}</span>
                                    </div>
                                    <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                                        {post.excerpt || post.content?.slice(0, 100)}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                                        <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                                        <div className="flex gap-3">
                                            <span>👁 {post.views}</span>
                                            <span>❤️ {post.likes}</span>
                                            <span>⏱ {post.readTime}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            to={`/Blogs/${post._id}`}
                                            className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm font-medium rounded-md text-center transition-colors"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            to={`/edit/${post._id}`}
                                            className="flex-1 px-3 py-2 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white text-sm font-medium rounded-md text-center transition-all border border-blue-600/30"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDeletePost(post._id)}
                                            disabled={deletingId === post._id}
                                            className="px-3 py-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white text-sm font-medium rounded-md transition-all border border-red-600/30 disabled:opacity-50"
                                        >
                                            {deletingId === post._id ? '...' : 'Delete'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
