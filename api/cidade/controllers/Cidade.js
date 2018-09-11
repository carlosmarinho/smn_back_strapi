'use strict';

/**
 * Cidade.js controller
 *
 * @description: A set of functions called "actions" for managing `Cidade`.
 */

module.exports = {

  /**
   * Retrieve cidade records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.cidade.search(ctx.query);
    } else {
      return strapi.services.cidade.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a cidade record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.cidade.fetch(ctx.params);
  },

  /**
   * Count cidade records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.cidade.count(ctx.query);
  },

  /**
   * Create a/an cidade record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.cidade.add(ctx.request.body);
  },

  /**
   * Update a/an cidade record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.cidade.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an cidade record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.cidade.remove(ctx.params);
  }
};
