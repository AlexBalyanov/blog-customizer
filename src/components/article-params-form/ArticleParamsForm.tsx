import { ArrowButton } from 'src/ui/arrow-button';

import styles from './ArticleParamsForm.module.scss';
import { ReactNode, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	fontColors,
	fontFamilyOptions,
	OptionType,
} from 'src/constants/articleProps';

export type ArticleParamsFormProps = {
	children: ReactNode;
	config: Partial<ArticleStateType>;
	onChange: (config: Partial<ArticleStateType>) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { children, config, onChange } = props;

	const [isOpen, setOpen] = useState<boolean>(false);

	const toggleOpenState = () => {
		setOpen(!isOpen);
	};

	const handleFontSelect = (option: OptionType) => {
		onChange({
			...config,
			fontFamilyOption: option,
		});
	};

	const handleFontColorSelect = (option: OptionType) => {
		onChange({
			...config,
			fontColor: option,
		});
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
						selected={config.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontSelect}></Select>
					<Select
						title={'цвет шрифта'}
						placeholder={'Выберите цвет шрифта'}
						selected={config.fontColor}
						options={fontColors}
						onChange={handleFontColorSelect}></Select>
					<div className={styles.bottomContainer}>{children}</div>
				</form>
			</aside>
		</>
	);
};
