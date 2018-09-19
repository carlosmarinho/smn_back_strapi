'use strict';

/**
 * Guia.js controller
 *
 * @description: A set of functions called "actions" for managing `Guia`.
 */

module.exports = {

  /**
   * Retrieve guia records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.guia.search(ctx.query);
    } else {
      return strapi.services.guia.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a guia record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.guia.fetch(ctx.params);
  },

  /**
   * Count guia records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.guia.count(ctx.query);
  },

  /**
   * Create a/an guia record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.guia.add(ctx.request.body);
  },

  /**
   * Update a/an guia record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.guia.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an guia record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.guia.remove(ctx.params);
  }
};
