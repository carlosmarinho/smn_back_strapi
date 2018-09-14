'use strict';

/**
 * Uploadfile.js controller
 *
 * @description: A set of functions called "actions" for managing `Uploadfile`.
 */

module.exports = {

  /**
   * Retrieve uploadfile records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.uploadfile.search(ctx.query);
    } else {
      return strapi.services.uploadfile.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a uploadfile record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.uploadfile.fetch(ctx.params);
  },

  /**
   * Count uploadfile records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.uploadfile.count(ctx.query);
  },

  /**
   * Create a/an uploadfile record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.uploadfile.add(ctx.request.body);
  },

  /**
   * Update a/an uploadfile record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.uploadfile.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an uploadfile record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.uploadfile.remove(ctx.params);
  }
};
