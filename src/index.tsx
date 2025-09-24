import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, SyntheticEvent } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { Button } from 'src/ui/button';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [config, setConfig] = useState<Partial<ArticleStateType>>({});

	const articleConfig: Partial<ArticleStateType> = {};

	const handleFormChange = (config: Partial<ArticleStateType>) => {
		setConfig(config);
	};

	const handeApplyingChanges = (evt?: SyntheticEvent) => {
		evt?.preventDefault();
	};

	console.log(articleConfig);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleConfig.fontFamilyOption?.value,
					'--font-size': defaultArticleState.fontSizeOption.value,
					'--font-color': defaultArticleState.fontColor.value,
					'--container-width': defaultArticleState.contentWidth.value,
					'--bg-color': defaultArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm config={config} onChange={handleFormChange}>
				<Button title='Сбросить' htmlType='reset' type='clear' />
				<Button
					title='Применить'
					htmlType='submit'
					type='apply'
					onClick={handeApplyingChanges}
				/>
			</ArticleParamsForm>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
