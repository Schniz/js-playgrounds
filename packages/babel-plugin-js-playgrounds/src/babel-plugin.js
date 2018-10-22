const path = require('path')
module.exports = function(babel) {
  const { types: t } = babel;

  const declare = name => {
    let node = t.callExpression(t.identifier("require"), [
      t.stringLiteral(path.resolve(__dirname, "playground.js"))
    ]);
    node.shouldSkip = true;
    let vd = t.variableDeclarator(t.identifier("var " + name), node);
    return vd;
  };

  const locToObj = loc => {
    return t.objectExpression([
      t.objectProperty(t.identifier("line"), t.stringLiteral(String(loc.line))),
      t.objectProperty(
        t.identifier("column"),
        t.stringLiteral(String(loc.column))
      )
    ]);
  };

  return {
    name: "ast-transform", // not required
    pre(f) {
      this.randomName = `playground_fn_${f.scope.generateUid()}`;
      f.path
        .find(x => x.type == "Program")
        .node.body.unshift(declare(this.randomName));
    },
    visitor: {
      Expression(path) {
        if (
          path.node.shouldSkip ||
          (path.node.callee && path.node.callee.name == this.randomName) ||
          path.findParent(
            x => x.type === "CallExpression" || x.type === "ObjectPattern"
          )
        )
          return;
        const loc = path.node.loc;
        let node = t.callExpression(t.identifier(this.randomName), [
          locToObj(loc.end),
          path.node
        ]);
        path.replaceWith(node);
      }
    }
  };
};
