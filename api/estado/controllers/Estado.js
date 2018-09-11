'use strict';

/**
 * Estado.js controller
 *
 * @description: A set of functions called "actions" for managing `Estado`.
 */

module.exports = {

  /**
   * Retrieve estado records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.estado.search(ctx.query);
    } else {
      return strapi.services.estado.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a estado record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.estado.fetch(ctx.params);
  },

  /**
   * Count estado records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.estado.count(ctx.query);
  },

  /**
   * Create a/an estado record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.estado.add(ctx.request.body);
  },

  /**
   * Update a/an estado record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.estado.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an estado record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.estado.remove(ctx.params);
  }
};
