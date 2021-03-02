const Boom = require('@hapi/boom');
const Joi = require('joi');

const addMeasurementForCurrentUser = {
  method: 'POST',
  path: '/api/measurements',
  handler: async (request, h) => {
    try {
      if (!request.auth.isAuthenticated) {
        return Boom.unauthorized();
      }
      const userId = request.auth.credentials.profile.id;

      const { measureDate, workHours } = request.payload;
      const res = await request.mongo.db
        .collection('measurements')
        .insertOne({ userId, measureDate, workHours });
      return res.insertedCount > 0 ? res.ops[0] : Boom.badRequest;
    } catch (error) {
      console.log(error);
      return Boom.serverUnavailable();
    }
  },
  options: {
    auth: { mode: 'try' },
    validate: {
      payload: Joi.object({
        measureDate: Joi.date(),
        workHours: Joi.number(),
      }),
    },
  },
};
const allMeasurementsForCurrentUser = {
  method: 'GET',
  path: '/api/measurements',
  handler: async (request, h) => {
    try {
      if (!request.auth.isAuthenticated) {
        return Boom.unauthorized();
      }
      const userId = request.auth.credentials.profile.id;
      const measurements = await request.mongo.db
        .collection('measurements')
        .find({ userId })
        .sort({ measureDate: 1 })
        .toArray();
      return measurements;
    } catch (error) {
      console.log(error);
      return Boom.serverUnavailable();
    }
  },
  options: {
    auth: { mode: 'try' },
  },
};

const deleteMeasurementForCurrentUserById = {
  method: 'DELETE',
  path: '/api/measurements/{id}',
  handler: async (request, h) => {
    try {
      if (!request.auth.isAuthenticated) {
        return Boom.unauthorized();
      }
      const userId = request.auth.credentials.profile.id;
      const { id } = request.params;
      const res = await request.mongo.db
        .collection('measurements')
        .deleteOne({ _id: request.mongo.ObjectID(id), userId });
      return res.deletedCount > 0 ? h.response().code(204) : Boom.notFound();
    } catch (error) {
      console.log(error);
      return Boom.serverUnavailable();
    }
  },
  options: {
    auth: { mode: 'try' },
    validate: {
      params: Joi.object({
        id: Joi.string(),
      }),
    },
  },
};
const getMeasurementsForCurrentUserById = {
  method: 'GET',
  path: '/api/measurements/{id}',
  handler: async (request, h) => {
    try {
      if (!request.auth.isAuthenticated) {
        return Boom.unauthorized();
      }
      console.log(request.auth.credentials.profile);
      const userId = request.auth.credentials.profile.id;
      const { id } = request.params;
      const data = { _id: request.mongo.ObjectID(id), userId };
      console.log(data);
      const res = await request.mongo.db
        .collection('measurements')
        .findOne(data);
      console.log(res);
      return res ? h.response(res) : Boom.notFound();
    } catch (error) {
      console.log(error);
      return Boom.serverUnavailable();
    }
  },
  options: {
    auth: { mode: 'try' },
    validate: {
      params: Joi.object({
        id: Joi.string(),
      }),
    },
  },
};
const updateMeasurementsForCurrentUserById = {
  method: 'PUT',
  path: '/api/measurements/{id}',
  handler: async (request, h) => {
    try {
      if (!request.auth.isAuthenticated) {
        return Boom.unauthorized();
      }
      const userId = request.auth.credentials.profile.id;
      const { id } = request.params;
      const { payload } = request;
      const data = { _id: request.mongo.ObjectID(id), userId };
      const res = await request.mongo.db
        .collection('measurements')
        .updateOne(data, { $set: payload });

      return res.modifiedCount > 0 ? h.response(payload) : Boom.notFound();
    } catch (error) {
      console.log(error);
      return Boom.serverUnavailable();
    }
  },
  options: {
    auth: { mode: 'try' },
    validate: {
      params: Joi.object({
        id: Joi.string(),
      }),
      payload: Joi.object({
        measureDate: Joi.date(),
        workHours: Joi.number(),
      }),
    },
  },
};

module.exports = [
  addMeasurementForCurrentUser,
  allMeasurementsForCurrentUser,
  deleteMeasurementForCurrentUserById,
  getMeasurementsForCurrentUserById,
  updateMeasurementsForCurrentUserById,
];
