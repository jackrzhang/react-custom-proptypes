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
  message
) {
  // See customProp: https://facebook.github.io/react/docs/reusable-components.html#prop-validation
  return function typeChecker(
    props,
    propName,
    componentName
  ) {
    const prop = props[propName];

    if (typeof callback(prop) !== 'boolean') {
      return new Error(
        'Invalid createPropType input: callback parameter must evaluate to a boolean value. ' +
        'See https://github.com/jackrzhang/react-custom-proptypes#parameters for details.'
      );
    }
    if (!!message && typeof message !== 'string') {
      return new Error(
        'Invalid createPropType input: message parameter must be of type string. ' +
        'See https://github.com/jackrzhang/react-custom-proptypes#parameters for details.'
      );
    }

    /* eslint-disable no-param-reassign, max-len */
    message = message || `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`;
    /* eslint-enable no-param-reassign, max-len */

    if (!callback(prop)) {
      return new Error(message);
    }

    return null;
  };
}

function createCustomIteratorTypeChecker(
  callback,
  message
) {
  return function typeChecker(
    propValue,
    key,
    componentName,
    location,
    propFullName
) {
    if (typeof callback(propValue) !== 'boolean') {
      return new Error(
        'Invalid createPropType input: callback parameter must evaluate to a boolean value. ' +
        'See https://github.com/jackrzhang/react-custom-proptypes#parameters for details.'
      );
    }
    if (!!message && typeof message !== 'string') {
      return new Error(
        'Invalid createPropType input: message parameter must be of type string. ' +
        'See https://github.com/jackrzhang/react-custom-proptypes#parameters for details.'
      );
    }

    /* eslint-disable no-param-reassign, max-len */
    message = message || `Invalid prop \`${propFullName}\` supplied to \`${componentName}\`. Validation failed.`;
    /* eslint-enable no-param-reassign, max-len */

    if (!callback(propValue, key)) {
      return new Error(message);
    }

    return null;
  };
}

export function createPropType(callback, message) {
  return createChainableTypeChecker(
    createCustomTypeChecker(callback, message)
  );
}

export function createIteratorPropType(callback, message) {
  return createCustomIteratorTypeChecker(callback, message);
}
