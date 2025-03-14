// Import types
import type { BlogType, BlogStatusType } from "src/objects/blog/types";

export class BlogUtils {
  /**
   * Get blog by its `id`
   * @param blogs
   * @param id
   * @returns
   */
  static getBlogById(blogs: Array<BlogType> | null, id: string) {
    if (!blogs) return null;
    return blogs.find((blog) => blog._id === id);
  }

  /**
   * Get attribute in attributes list of blog by `name`
   * @param attributes
   * @param name
   * @returns
   */
  static getBlogAttributeByName(attributes: Array<any> | null, name: string) {
    if (!attributes) return null;
    return attributes.find((attribute) => attribute.name === name);
  }

  /**
   * Get attribute in attributes list of blog by `id`
   * @param attributes
   * @param name
   * @returns
   */
  static getBlogAttributeById(attributes: Array<any> | null, id: string) {
    if (!attributes) return null;
    return attributes.find((attribute) => attribute._id === id);
  }

  /**
   * Get attribute in attributes list of blog by `value`
   * @param attributes
   * @param name
   * @returns
   */
  static getBlogAttributeByValue(attributes: Array<any> | null, value: string) {
    if (!attributes) return null;
    return attributes.find((attribute) => attribute.value === value);
  }

  /**
   * Get color by status
   * @param status
   * @returns
   */
  static getStatusColor(status: boolean) {
    let result = "";
    let value = status === true ? "verified" : "unverified";

    switch (value) {
      case "unverified": {
        result = `border-red-700 bg-red-100`;
        break;
      }

      case "verified": {
        result = `border-green-700 bg-green-100`;
        break;
      }
    }

    return result;
  }

  static toModel(blog?: BlogType) {
    if (!blog) return;

    return {
      authorId: blog.author._id,
      typeId: blog.type._id,
      mentionedPlaceIds: blog.mentionedPlaces?.map((place) => place._id) || [],
      name: blog.name,
      content: blog.content,
      coverImage: blog.coverImage,
      images: blog.images || [],
      readTime: blog.readTime,
      isApproved: blog.isApproved,
    };
  }
}
