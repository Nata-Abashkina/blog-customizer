import { useState, useRef, useEffect, FormEvent } from 'react';
import clsx from 'clsx';
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
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const formRef = useRef<HTMLFormElement | null>(null);

	const togglePanel = () => setIsMenuOpen((prev) => !prev);

	useEffect(() => {
		if (!isMenuOpen) return;

		const handleOutsideClick = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isMenuOpen]);

	const handleChange =
		<K extends keyof ArticleStateType>(field: K) =>
		(value: ArticleStateType[K]) =>
			setFormState((prev) => ({ ...prev, [field]: value }));

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
			<ArrowButton isOpen={isMenuOpen} onClick={togglePanel} />

			<aside
				className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				<form
					ref={formRef}
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<div className={styles.spacing}>
						<Text as='h2' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
					</div>

					<div className={styles.spacing}>
						<Select
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleChange('fontFamilyOption')}
							title='Шрифт'
						/>
					</div>

					<div className={styles.spacing}>
						<RadioGroup
							name='fontSize'
							selected={formState.fontSizeOption}
							options={fontSizeOptions}
							onChange={handleChange('fontSizeOption')}
							title='Размер шрифта'
						/>
					</div>

					<div className={styles.spacing}>
						<Select
							selected={formState.fontColor}
							options={fontColors}
							onChange={handleChange('fontColor')}
							title='Цвет текста'
						/>
					</div>

					<div className={styles.spacing}>
						<Separator />
					</div>

					<div className={styles.spacing}>
						<Select
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={handleChange('backgroundColor')}
							title='Цвет фона'
						/>
					</div>

					<div className={styles.spacing}>
						<Select
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={handleChange('contentWidth')}
							title='Ширина контента'
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
