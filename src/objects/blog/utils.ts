// Import types
import type { BlogType, BlogStatusType } from "src/objects/blog/types";

export class BlogUtils {
  /**
   * Get task by its `id`
   * @param tasks
   * @param id
   * @returns
   */
  static getBlogById(tasks: Array<BlogType> | null, id: string) {
    if (!tasks) return null;
    return tasks.find((task) => task._id === id);
  }

  /**
   * Get attribute in attributes list of task by `name`
   * @param attributes
   * @param name
   * @returns
   */
  static getBlogAttributeByName(attributes: Array<any> | null, name: string) {
    if (!attributes) return null;
    return attributes.find((attribute) => attribute.name === name);
  }

  /**
   * Get attribute in attributes list of task by `id`
   * @param attributes
   * @param name
   * @returns
   */
  static getBlogAttributeById(attributes: Array<any> | null, id: string) {
    if (!attributes) return null;
    return attributes.find((attribute) => attribute._id === id);
  }

  /**
   * Get attribute in attributes list of task by `value`
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
  static getStatusColor(status: BlogStatusType | string) {
    let result = "";
    let value = "";

    if (typeof status === "string") value = status;
    else value = status.value;

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
}
