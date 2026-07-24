import { useState, useRef, useEffect, FormEvent } from 'react';
import clsx from 'clsx'; // Импортируем clsx для строгого соответствия чек-листу
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import {
	defaultArticleState,
	ArticleStateType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const formRef = useRef<HTMLFormElement | null>(null);

	const togglePanel = () => setIsOpen((prev) => !prev);

	useEffect(() => {
		if (!isOpen) return;

		const handleOutsideClick = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen]);

	const handleFontFamilyChange = (val: OptionType) => {
		setFormState((prev) => ({ ...prev, fontFamilyOption: val }));
	};

	const handleFontSizeChange = (val: OptionType) => {
		setFormState((prev) => ({ ...prev, fontSizeOption: val }));
	};

	const handleFontColorChange = (val: OptionType) => {
		setFormState((prev) => ({ ...prev, fontColor: val }));
	};

	const handleBackgroundColorChange = (val: OptionType) => {
		setFormState((prev) => ({ ...prev, backgroundColor: val }));
	};

	const handleContentWidthChange = (val: OptionType) => {
		setFormState((prev) => ({ ...prev, contentWidth: val }));
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		setArticleState(formState);
	};

	const handleReset = (event: FormEvent) => {
		event.preventDefault();
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={togglePanel} />

			{/* Используем clsx для объединения классов, как требует чек-лист */}
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					ref={formRef}
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
						title='Шрифт'
					/>

					<RadioGroup
						name='fontSize'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleFontSizeChange}
						title='Размер шрифта'
					/>

					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleFontColorChange}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleBackgroundColorChange}
						title='Цвет фона'
					/>

					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthChange}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
