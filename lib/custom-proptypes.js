const ANONYMOUS = '<<anonymous>>';

// Pulled from: https://github.com/facebook/react/blob/master/src/isomorphic/classic/types/ReactPropTypes.js#L108
function createChainableTypeChecker(validate) {
  function checkType(
    isRequired,
    props,
    propName,
    componentName = ANONYMOUS
  ) {
    if (props[propName] == null) {
      if (isRequired) {
        if (props[propName] === null) {
          return new Error(
            `The \`${propName}\` is marked as required ` +
            `in \`${componentName}\`, but its value is \`null\`.`
          );
        }

        return new Error(
          `The \`${propName}\` is marked as required in ` +
          `\`${componentName}\`, but its value is \`undefined\`.`
        );
      }

      return null;
    }

    return validate(
      props,
      propName,
      componentName
    );
  }

  // Use of .bind for creating the chainable `.isRequired` interface
  const chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

function createCustomTypeChecker(
  callback,
  description
) {
  // See customProp: https://facebook.github.io/react/docs/reusable-components.html#prop-validation
  return function typeChecker(
    props,
    propName,
    componentName // eslint-disable-line no-unused-vars
  ) {
    const prop = props[propName];

    const success = callback(prop, props);

    if (typeof success !== 'boolean') {
      return new Error(
        'Invalid createPropType input: callback parameter must evaluate to a boolean value.\n' +
        'See https://github.com/jackrzhang/react-custom-proptypes#parameters for details.'
      );
    }
    if (!!description && typeof description !== 'string') {
      return new Error(
        'Invalid createPropType input: description parameter must be of type string.\n' +
        'See https://github.com/jackrzhang/react-custom-proptypes#parameters for details.'
      );
    }

    /* eslint-disable no-param-reassign, max-len */
    const errorInfo = `Invalid prop \`${propName}\` of type \`${typeof prop}\` supplied.`;
    const message = description ? `${errorInfo}\n${description}` : errorInfo;
    /* eslint-enable no-param-reassign, max-len */

    if (!success) {
      return new Error(message);
    }

    return null;
  };
}

function createCustomIteratorTypeChecker(
  callback,
  description
) {
  return function typeChecker(
    propValue,
    key,
    componentName,
    location,
    propFullName
) {
    const prop = propValue[key];

    const success = callback(prop, key);

    if (typeof success !== 'boolean') {
      return new Error(
        'Invalid createIteratorPropType input:\n' +
        'callback parameter must evaluate to a boolean value. \n' +
        'See https://github.com/jackrzhang/react-custom-proptypes#parameters for details.'
      );
    }
    if (!!description && typeof description !== 'string') {
      return new Error(
        'Invalid createIteratorPropType input:\n' +
        'description parameter must be of type string.\n' +
        'See https://github.com/jackrzhang/react-custom-proptypes#parameters for details.'
      );
    }

    /* eslint-disable no-param-reassign, max-len */
    const errorInfo = `Invalid prop \`${propFullName}\` of type \`${typeof prop}\` supplied.`;
    const message = description ? `${errorInfo}\n${description}` : errorInfo;
    /* eslint-enable no-param-reassign, max-len */

    if (!success) {
      return new Error(message);
    }

    return null;
  };
}


/* API */
export function createPropType(callback, message) {
  return createChainableTypeChecker(
    createCustomTypeChecker(callback, message)
  );
}

export function createIteratorPropType(callback, message) {
  return createCustomIteratorTypeChecker(callback, message);
}
