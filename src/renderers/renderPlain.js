import _ from 'lodash';

const stringify = value => (_.isObject(value) ? 'complex value' : `'${value}'`);

const prerenderArr = (ast, parentArr = []) => {
  const renderIter = (astNode) => {
    const { type, key } = astNode;
    const fullKeyArr = [...parentArr, key];
    const beginning = `Property ${fullKeyArr.join('.')}`;
    switch (type) {
      case 'same':
        return `${beginning} was the same.`;
      case 'added':
        return `${beginning} was added with ${stringify(astNode.value2)}`;
      case 'removed':
        return `${beginning} was removed.`;
      case 'different':
        return `${beginning} was updated. From ${stringify(astNode.value1)} to ${stringify(astNode.value2)}`;
      case 'objects':
        return prerenderArr(astNode.children, fullKeyArr);
      default:
        throw new Error(`unknown type: ${type}. internal bug`);
    }
  };
  const renderedArr = ast.map(renderIter);
  return renderedArr;
};

const renderPlain = ast => _.flattenDeep(prerenderArr(ast)).join('\n');

export default renderPlain;
