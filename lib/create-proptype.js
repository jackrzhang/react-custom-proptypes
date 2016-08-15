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
  // Ideally, propTypes should be validated only in development:
  // https://facebook.github.io/react/warnings/dont-call-proptypes.html
  return function validate(
    props,
    propName,
    componentName
  ) {
    const prop = props[propName];

    if (typeof callback(prop) !== 'boolean') {
      return new Error(
        'ERROR MESSAGE for the callback to evaluate to a boolean value'
      );
    }
    if (!!message && typeof message !== 'string') {
      return new Error(
        'ERROR MESSAGE for the string param to be of type string'
      );
    }

    /* eslint-disable no-param-reassign */
    message = message || 'DEFAULT MESSAGE';
    /* eslint-enable no-param-reassign */

    if (!callback(prop)) {
      return new Error(message);
    }

    return null;
  };
}

function createPropType(callback, message) {
  return createChainableTypeChecker(
    createCustomTypeChecker(callback, message)
  );
}

export default createPropType;
