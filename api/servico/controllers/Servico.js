'use strict';

/**
 * Servico.js controller
 *
 * @description: A set of functions called "actions" for managing `Servico`.
 */

module.exports = {

  /**
   * Retrieve servico records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.servico.search(ctx.query);
    } else {
      return strapi.services.servico.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a servico record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.servico.fetch(ctx.params);
  },

  /**
   * Count servico records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.servico.count(ctx.query);
  },

  /**
   * Create a/an servico record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.servico.add(ctx.request.body);
  },

  /**
   * Update a/an servico record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.servico.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an servico record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.servico.remove(ctx.params);
  }
};
