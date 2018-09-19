'use strict';

/**
 * Comentario.js controller
 *
 * @description: A set of functions called "actions" for managing `Comentario`.
 */

module.exports = {

  /**
   * Retrieve comentario records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.comentario.search(ctx.query);
    } else {
      return strapi.services.comentario.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a comentario record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.comentario.fetch(ctx.params);
  },

  /**
   * Count comentario records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.comentario.count(ctx.query);
  },

  /**
   * Create a/an comentario record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.comentario.add(ctx.request.body);
  },

  /**
   * Update a/an comentario record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.comentario.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an comentario record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.comentario.remove(ctx.params);
  }
};
