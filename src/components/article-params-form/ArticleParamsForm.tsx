import { ArrowButton } from 'src/ui/arrow-button';
import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideFromClose } from 'components/article-params-form/hooks/useOutsideFormClose';

export type ArticleParamsFormProps = {
	onApply: (value: Partial<ArticleStateType>) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { onApply } = props;
	const [isOpen, setOpen] = useState<boolean>(false);
	const [formConfig, setFormConfig] =
		useState<Partial<ArticleStateType>>(defaultArticleState);
	const formRef = useRef<HTMLElement | null>(null);

	useOutsideFromClose({ isOpen: isOpen, rootRef: formRef, onChange: setOpen });

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

	const handleFontSizeSelect = (option: OptionType) => {
		setFormConfig({
			...formConfig,
			fontSizeOption: option,
		});
	};

	const handleBgColorSelect = (option: OptionType) => {
		setFormConfig({
			...formConfig,
			backgroundColor: option,
		});
	};

	const handleContentWidthSelect = (option: OptionType) => {
		setFormConfig({
			...formConfig,
			contentWidth: option,
		});
	};

	const handeApplyingChanges = (evt?: SyntheticEvent) => {
		evt?.preventDefault();
		onApply(formConfig);
	};

	const handleReset = () => {
		setFormConfig(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleOpenState} />
			<aside
				ref={formRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title={'шрифт'}
						selected={formConfig.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontSelect}></Select>
					<RadioGroup
						name={'размер шрифта'}
						options={fontSizeOptions}
						selected={formConfig.fontSizeOption}
						title={'размер шрифта'}
						onChange={handleFontSizeSelect}
					/>
					<Select
						title={'цвет шрифта'}
						selected={formConfig.fontColor}
						options={fontColors}
						onChange={handleFontColorSelect}></Select>
					<Separator />
					<Select
						title={'цвет фона'}
						selected={formConfig.backgroundColor}
						options={backgroundColors}
						onChange={handleBgColorSelect}></Select>
					<Select
						title={'ширина контейнера'}
						selected={formConfig.contentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthSelect}></Select>
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
