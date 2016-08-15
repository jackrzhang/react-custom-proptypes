// Pulled from: https://github.com/facebook/react/blob/master/src/isomorphic/classic/types/ReactPropTypes.js#L108
const ANONYMOUS = '<<anonymous>>';

function createChainableTypeChecker(validate) {
  function checkType(
    isRequired,
    props,
    propName,
    componentName
  ) {
    /* eslint-disable no-param-reassign */
    componentName = componentName || ANONYMOUS;
    /* eslint-enable no-param-reassign */

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

function createCustomTypeChecker(callback, message) {
  // https://facebook.github.io/react/docs/reusable-components.html#prop-validation
  // Ideally, propTypes should be validated only in development:
  // https://facebook.github.io/react/warnings/dont-call-proptypes.html
  return function validate(
    props,
    propName,
    componentName
  ) {
    // custom validation logic here
  };
}

function createPropType(callback, message) {
  return createChainableTypeChecker(
    createCustomTypeChecker(callback, message)
  );
}

export default createPropType;

