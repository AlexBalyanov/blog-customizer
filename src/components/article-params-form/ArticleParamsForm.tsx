import { ArrowButton } from 'src/ui/arrow-button';

import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Button } from 'src/ui/button';

export type ArticleParamsFormProps = {
	onApply: (value: Partial<ArticleStateType>) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { onApply } = props;
	const [isOpen, setOpen] = useState<boolean>(false);
	const [formConfig, setFormConfig] =
		useState<Partial<ArticleStateType>>(defaultArticleState);

	const toggleOpenState = () => {
		setOpen(!isOpen);
	};

	const handleFontSelect = (option: OptionType) => {
		setFormConfig({
			...formConfig,
			fontFamilyOption: option,
		});
	};

	const handleFontColorSelect = (option: OptionType) => {
		setFormConfig({
			...formConfig,
			fontColor: option,
		});
	};

	const handeApplyingChanges = (evt?: SyntheticEvent) => {
		evt?.preventDefault();

		onApply(formConfig);
	};

	const handleReset = () => {
		setFormConfig(defaultArticleState);

		onApply(formConfig);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleOpenState} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title={'шрифт'}
						placeholder={'Выберите шрифт'}
						selected={formConfig.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontSelect}></Select>
					<Select
						title={'цвет шрифта'}
						placeholder={'Выберите цвет шрифта'}
						selected={formConfig.fontColor}
						options={fontColors}
						onChange={handleFontColorSelect}></Select>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handeApplyingChanges}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
