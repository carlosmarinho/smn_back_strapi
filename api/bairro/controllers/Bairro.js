'use strict';

/**
 * Bairro.js controller
 *
 * @description: A set of functions called "actions" for managing `Bairro`.
 */

module.exports = {

  /**
   * Retrieve bairro records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.bairro.search(ctx.query);
    } else {
      return strapi.services.bairro.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a bairro record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.bairro.fetch(ctx.params);
  },

  /**
   * Count bairro records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.bairro.count(ctx.query);
  },

  /**
   * Create a/an bairro record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.bairro.add(ctx.request.body);
  },

  /**
   * Update a/an bairro record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.bairro.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an bairro record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.bairro.remove(ctx.params);
  }
};
