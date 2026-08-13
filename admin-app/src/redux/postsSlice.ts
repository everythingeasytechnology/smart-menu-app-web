import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Post {
  id: number | string;
  title: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  description: string;
  content: string;
  author: string;
  category: string;
  tags: string;
  status: 'published' | 'draft' | string;
  image_url: string;
  created_at?: string;
}

interface PostsState {
  posts: Post[];
}

const mockPosts: Post[] = [
  {
    id: 1,
    title: "5 Signs Your Business Needs a Mobile App",
    meta_title: "5 Signs Your Business Needs a Mobile App | EverythingEasy Technology",
    meta_description: "Learn the key signs that indicate your business is ready for a custom mobile app.",
    meta_keywords: "mobile app, business growth, app development",
    description: "Not sure if your business needs a mobile app yet? Here are five clear signs it's time to invest in one.",
    content: "<p>Building a mobile app is a big investment...</p>",
    author: "EverythingEasy Team",
    category: "App Development",
    tags: "mobile app,business,growth",
    status: "published",
    image_url: "https://everythingeasy.in/images/blog/mobile-app-signs.jpg",
    created_at: new Date().toISOString(),
  }
];

const postsSlice = createSlice({
  name: 'posts',
  initialState: { posts: mockPosts } as PostsState,
  reducers: {
    setPostsList: (state, action: PayloadAction<Post[]>) => {
      // Create a map to merge posts without duplicates
      const newPostsMap = new Map();
      state.posts.forEach(p => newPostsMap.set(p.id, p));
      action.payload.forEach(p => newPostsMap.set(p.id, p));
      state.posts = Array.from(newPostsMap.values());
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex(p => p.id === action.payload.id);
      if (index !== -1) state.posts[index] = action.payload;
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(p => p.id !== action.payload);
    },
  },
});

export const { setPostsList, addPost, updatePost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
