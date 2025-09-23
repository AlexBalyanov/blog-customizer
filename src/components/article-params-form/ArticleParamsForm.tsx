import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { fontFamilyOptions } from 'src/constants/articleProps';

export const ArticleParamsForm = () => {
	const [isOpen, setOpen] = useState<boolean>(false);

	const toggleOpenState = () => {
		setOpen(!isOpen);
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
						selected={fontFamilyOptions[0]}
						options={fontFamilyOptions}>
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
