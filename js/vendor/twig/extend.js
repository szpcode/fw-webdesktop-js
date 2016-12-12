Twig.extend(function(Twig) {
    Twig.exports.extendTag({
        type: "script",
        regex: /^script$/,
        next: ["endscript"],
        open: true,
        // compile: function (token) {
            // console.log(token);
        // },
        parse: function (token, context, chain) {
            var output = '';
            output = Twig.parse.apply(this, [token.output, context]);
            console.log(output);
            // eval(output);
            // console.log(chain);
            return {
                chain: chain,
                output: ''
            };
        }
    });

    Twig.exports.extendTag({
        type: "endscript",
        regex: /^endscript$/,
        next: [ ],
        open: false
    });
});