module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
        ['@babel/preset-react', {runtime: 'automatic'}],
    ],
    plugin: [
        //配置 TDesign 按需导入
        [
            'import',
            {
                libraryName: 'tdesign-react',
                libraryDirectory: 'esm',
                style: true, 
            },
            'tdesign-react',
        ]
    ]
}