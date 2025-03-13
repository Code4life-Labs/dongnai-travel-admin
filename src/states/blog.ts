import { create } from "zustand";

// Import utils
import { OtherUtils } from "src/utils/other";

// Import types
import type { BlogType, BlogStatusType } from "src/objects/blog/types";

type BlogState = {
  currentBlog: BlogType | null;
  blogs: Array<BlogType> | null;
  blogsByStatus: Map<string, Array<BlogType> | null> | null;
  blogStatuses: Array<BlogStatusType> | null;
  isResponding: boolean;
};

type BlogActions = {
  // For blog
  setCurrentBlog(blog: BlogType | null): void;
  setBlogs(blogs: Array<BlogType> | null): void;
  addBlogs(blogs: Array<BlogType> | null): void;
  addBlog(blog: BlogType): void;
  addBlogToGroup(groupName: string, blog: BlogType | string): void;
  updateBlog(blog: BlogType): void;
  deleteBlogFromGroup(blog: BlogType | string): void;
  deteteBlog(blog: BlogType): void;
  updateIsResponding(status?: boolean): void;
  clearBlogs(): void;

  // For status of blog
  setBlogStatuses(statuses?: Array<BlogStatusType> | null): void;
};

/**
 * Use this function to add blogs to a group
 * @param blogsGroups
 * @param blogs
 */
function addBlogsToGroup(
  blogsGroups: Map<string, Array<BlogType> | null>,
  blogs: Array<BlogType>
) {
  for (const blog of blogs) {
    // Get blogList that is stored in Map
    let blogList = blogsGroups.get(getBlogStatus(blog));

    // If blogList is null, create new list
    if (!blogList) {
      blogList = [];
      blogsGroups.set(getBlogStatus(blog), blogList);
    }

    // Append to blog list by reference
    if (blogList.length === 0) {
      blogList.push(blog);
    }
  }
}

/**
 * Use this function to add a blog to a group
 * @param blogsGroups
 * @param blog
 */
function addBlogToGroup(
  blogsGroups: Map<string, Array<BlogType> | null>,
  blog: BlogType
) {
  // Get blogList that is stored in Map
  let blogList = blogsGroups.get(getBlogStatus(blog));

  // If blogList is null, create new list
  if (!blogList) {
    blogList = [];
    blogsGroups.set(getBlogStatus(blog), blogList);
  }

  blogList.push(blog);
  return;
}

/**
 * Use this function to delete a blog from a list.
 * @param list
 * @param blog
 */
function deleteBlogFromList(list: Array<BlogType>, blog: BlogType | string) {
  let blogId;

  if (typeof blog === "string") {
    blogId = blog;
  } else {
    blogId = blog._id;
  }

  // Find index
  const blogIndex = list.findIndex((blog) => blog._id === blogId);

  // Delete
  list.splice(blogIndex, 1);

  return list;
}

/**
 * Use this function to remove a blog from a group
 * @param blogsGroups
 * @param blog
 */
function deleteBlogFromGroup(
  groupName: string,
  blogsGroups: Map<string, Array<BlogType> | null>,
  blog: BlogType
) {
  const blogList = blogsGroups.get(groupName);

  if (!blogList) {
    console.error(`The group ${groupName} doesn't exist`);
    return;
  }

  // Delete blog
  deleteBlogFromList(blogList, blog);
}

/**
 * Use to get status of blog
 * @param blog
 */
function getBlogStatus(blog: BlogType) {
  return blog.isApproved === true ? "verified" : "unverified";
}

const initialState = {
  currentBlog: null,
  blogs: null,
  blogsByStatus: null,
  blogStatuses: null,
  blogPriorities: null,
  blogSizes: null,
  isResponding: false,
};

export const useBlogState = create<BlogState & BlogActions>((set) => {
  return {
    ...initialState,
    updateIsResponding(status?: boolean) {
      set((state) => ({ ...state, isResponding: Boolean(status) }));
    },

    setCurrentBlog(blog) {
      set((state) => {
        return { ...state, currentBlog: blog };
      });
    },

    setBlogs(blogs) {
      set((state) => {
        if (state.blogStatuses && !state.blogsByStatus) {
          state.blogStatuses.sort((a, b) => a.order - b.order);

          state.blogsByStatus = new Map<string, Array<BlogType> | null>(
            state.blogStatuses.map((status) => [status.value, null])
          );
        }

        // If blog and state.blogsByStatus are not null,
        // classify blogs with status
        if (blogs && state.blogsByStatus)
          addBlogsToGroup(state.blogsByStatus, blogs);

        return { ...state, blogs: blogs, blogsByStatus: state.blogsByStatus };
      });
    },

    addBlogs(blogs) {
      set((state) => {
        if (!blogs) return state;

        // Add blogs to global blogs
        if (state.blogs) state.blogs.concat(blogs);

        // If blog and state.blogsByStatus are not null,
        // classify blogs with status
        if (blogs && state.blogsByStatus)
          addBlogsToGroup(state.blogsByStatus, blogs);

        return {
          ...state,
          blogs: state.blogs,
          blogsByStatus: state.blogsByStatus,
        };
      });
    },

    addBlog(blog: BlogType) {
      set((state) => {
        if (!state.blogs) state.blogs = [];

        // Push to global blogs
        state.blogs.push(blog);

        // Add to group
        if (state.blogsByStatus) addBlogToGroup(state.blogsByStatus, blog);

        return { ...state, blogs: state.blogs };
      });
    },

    addBlogToGroup(blog: BlogType | string) {
      set((state) => {
        if (!state.blogs) return state;

        let _blog;
        if (typeof blog === "string") {
          _blog = state.blogs.find((t) => t._id === blog);
        }

        if (!_blog) return state;
        if (!state.blogsByStatus) return state;

        // Add blog to group
        addBlogToGroup(state.blogsByStatus, _blog);

        return { ...state, blogsByStatus: state.blogsByStatus };
      });
    },

    updateBlog(blog: BlogType) {
      set((state) => {
        if (!state.blogs) return state;
        if (!blog) return state;

        const oldBlogIndex = state.blogs.findIndex((t) => t._id === blog._id);

        // If new blog in another group, change this new blog group
        if (state.blogsByStatus) {
          // Delete from old group
          deleteBlogFromGroup(
            getBlogStatus(state.blogs[oldBlogIndex]),
            state.blogsByStatus,
            state.blogs[oldBlogIndex]
          );

          // Add to new group
          addBlogToGroup(state.blogsByStatus, blog);
        }

        // Update in global blogs
        // We don't need to update blog in group because
        // group is a list of references like global blogs.
        // So if we change the blog in global list by its reference,
        // the actual blog is changed.
        OtherUtils.replaceAt(state.blogs, oldBlogIndex, blog);

        return {
          ...state,
          blogs: state.blogs,
          blogsByStatus: state.blogsByStatus,
        };
      });
    },

    deleteBlogFromGroup(blog: BlogType | string) {
      set((state) => {
        if (!state.blogs) return state;

        let _blog;
        if (typeof blog === "string") {
          _blog = state.blogs.find((t) => t._id === blog);
        }

        if (!_blog) return state;

        // Delete from group
        if (state.blogsByStatus)
          deleteBlogFromGroup(getBlogStatus(_blog), state.blogsByStatus, _blog);

        return { ...state, blogsByStatus: state.blogsByStatus };
      });
    },

    deteteBlog(blog: BlogType) {
      set((state) => {
        if (!state.blogs) return state;

        // Delete from global store
        deleteBlogFromList(state.blogs, blog);

        // Delete from group to completely delete blog
        if (state.blogsByStatus)
          deleteBlogFromGroup(getBlogStatus(blog), state.blogsByStatus, blog);

        return {
          ...state,
          blogs: state.blogs,
          blogsByStatus: state.blogsByStatus,
        };
      });
    },

    clearBlogs() {
      set((state) => {
        return {
          ...state,
          ...initialState,
          blogStatuses: state.blogStatuses,
        };
      });
    },

    // For status of blog
    setBlogStatuses(statuses: Array<BlogStatusType> | null) {
      set((state) => {
        return { ...state, blogStatuses: statuses };
      });
    },
  };
});
