// React.PropTypes - createChainableTypeChecker
// Pulled from: https://github.com/facebook/react/blob/master/src/isomorphic/classic/types/ReactPropTypes.js#L108
const ANONYMOUS = '<<anonymous>>';

function createChainableTypeChecker(validate) {
  // Pass along ALL arguments down to the wrapped PropType - propTypes are validated only
  // in development: https://facebook.github.io/react/warnings/dont-call-proptypes.html
  function checkType(
    isRequired,
    props,
    propName,
    componentName,
    location,
    propFullName,
    secret
  ) {
    /* eslint-disable no-param-reassign */
    componentName = componentName || ANONYMOUS;
    propFullName = propFullName || propName;
    /* eslint-enable no-param-reassign */

    if (props[propName] == null) {
      if (isRequired) {
        if (props[propName] === null) {
          return new Error(
            `The ${location} \`${propFullName}\` is marked as required ` +
            `in \`${componentName}\`, but its value is \`null\`.`
          );
        }

        return new Error(
          `The ${location} \`${propFullName}\` is marked as required in ` +
          `\`${componentName}\`, but its value is \`undefined\`.`
        );
      }

      return null;
    }

    return validate(
      props,
      propName,
      componentName,
      location,
      propFullName,
      secret
    );
  }

  // Use of .bind for creating the chainable `.isRequired` interface
  const chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

function createPropType() {

}

export default createPropType;

