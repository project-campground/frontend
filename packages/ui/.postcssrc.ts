import { Plugin, Transformer } from 'postcss';
import autoprefixer from 'autoprefixer';

const postcssConfig: { plugins: (Plugin | Transformer)[] } = {
	plugins: [autoprefixer({ add: true })]
};

export default postcssConfig;
