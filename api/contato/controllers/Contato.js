'use strict';

/**
 * Contato.js controller
 *
 * @description: A set of functions called "actions" for managing `Contato`.
 */

module.exports = {

  /**
   * Retrieve contato records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.contato.search(ctx.query);
    } else {
      return strapi.services.contato.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a contato record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.contato.fetch(ctx.params);
  },

  /**
   * Count contato records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.contato.count(ctx.query);
  },

  /**
   * Create a/an contato record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.contato.add(ctx.request.body);
  },

  /**
   * Update a/an contato record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.contato.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an contato record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.contato.remove(ctx.params);
  }
};
