import APIRoutes from './routes';


class APIManager {
  constructor(config) {
    this.routes = new APIRoutes(config);
  }

  /** Load all relevant information of a given item */
  getItemInfo(itemId) {

  }

  /** Get list of annotations */
  getAnnotations(itemId, query = {}) {}

  /** Get all relevant info of a given annotation */
  getAnnotationInfo(annotationId) {}

  /** Register a new annotation to the database */
  createAnnotation(itemId, annotationData) {}

  /** Delete an annotation */
  deleteAnnotation(annotationId) {}

  /** Update annotation info */
  updateAnnotation(annotationId, annotationData) {}

  /** Check event type for item as ready */
  setItemIsReady(itemId, eventId) {}

  /** Uncheck event type for item as ready */
  unsetItemIsReady(itemId, eventId) {}

  /** Get a list of machine generated annotations */
  getPredictions(itemId, query = {}) {}
}

export default APIManager;
