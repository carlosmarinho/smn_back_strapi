'use strict';

/**
 * Modulo.js controller
 *
 * @description: A set of functions called "actions" for managing `Modulo`.
 */

module.exports = {

  /**
   * Retrieve modulo records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.modulo.search(ctx.query);
    } else {
      return strapi.services.modulo.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a modulo record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.modulo.fetch(ctx.params);
  },

  /**
   * Count modulo records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.modulo.count(ctx.query);
  },

  /**
   * Create a/an modulo record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.modulo.add(ctx.request.body);
  },

  /**
   * Update a/an modulo record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.modulo.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an modulo record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.modulo.remove(ctx.params);
  }
};
