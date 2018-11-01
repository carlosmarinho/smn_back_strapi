'use strict';

/**
 * Evento.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all eventos.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    let populateAssociation = true;
    if(params.populateAssociation){
      if(params.populateAssociation == 'false'){
        populateAssociation = false;
      }
      delete params.populateAssociation;
    }
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('evento', params);
    
    // Select field to populate.
    let populate;
    
    if(populateAssociation){
      populate = Evento.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');
    }
    else{
      populate = [];
    }

    return Evento
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  /**
   * Promise to fetch a/an evento.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Evento.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Evento
      .findOne(_.pick(params, _.keys(Evento.schema.paths)))
      .populate(populate);
  },

  /**
   * Promise to count eventos.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('evento', params);

    return Evento
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an evento.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Evento.associations.map(ast => ast.alias));
    const data = _.omit(values, Evento.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Evento.create(data);

    // Create relational data and return the entry.
    return Evento.updateRelations({ _id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an evento.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Evento.associations.map(a => a.alias));
    const data = _.omit(values, Evento.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Evento.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Evento.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an evento.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Evento.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Evento
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Evento.associations.map(async association => {
        const search = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
        const update = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

        // Retrieve model.
        const model = association.plugin ?
          strapi.plugins[association.plugin].models[association.model || association.collection] :
          strapi.models[association.model || association.collection];

        return model.update(search, update, { multi: true });
      })
    );

    return data;
  },

  /**
   * Promise to search a/an evento.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('evento', params);
    // Select field to populate.
    const populate = Evento.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Evento.attributes).reduce((acc, curr) => {
      switch (Evento.attributes[curr].type) {
        case 'integer':
        case 'float':
        case 'decimal':
          if (!_.isNaN(_.toNumber(params._q))) {
            return acc.concat({ [curr]: params._q });
          }

          return acc;
        case 'string':
        case 'text':
        case 'password':
          return acc.concat({ [curr]: { $regex: params._q, $options: 'i' } });
        case 'boolean':
          if (params._q === 'true' || params._q === 'false') {
            return acc.concat({ [curr]: params._q === 'true' });
          }

          return acc;
        default:
          return acc;
      }
    }, []);

    return Evento
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  }
};
