import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	fontColors,
	fontFamilyOptions,
	OptionType,
} from 'src/constants/articleProps';

export const ArticleParamsForm = () => {
	const [isOpen, setOpen] = useState<boolean>(false);

	const [config, setConfig] = useState<Partial<ArticleStateType>>({});

	const toggleOpenState = () => {
		setOpen(!isOpen);
	};

	const handleFontSelect = (option: OptionType) => {
		setConfig({
			...config,
			fontFamilyOption: option,
		});
	};

	const handleFontColorSelect = (option: OptionType) => {
		setConfig({
			...config,
			fontColor: option,
		});
	};

	console.log(config);

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
						onChange={handleFontSelect}>
					</Select>
					<Select
						title={'цвет шрифта'}
						placeholder={'Выберите цвет шрифта'}
						selected={config.fontColor}
						options={fontColors}
						onChange={handleFontColorSelect}>
					</Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
