import { useEffect } from 'react';

type useOutsideFromCloseProps = {
	isFormOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export const useOutsideFromClose = ({
	isFormOpen,
	rootRef,
	onClose,
	onChange,
}: useOutsideFromCloseProps) => {
	useEffect(() => {
		if (!isFormOpen) {
			return;
		}

		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isFormOpen && onClose?.();
				onChange?.(false);
			}
		};

		const handleEscKey = (evt: KeyboardEvent) => {
			if (evt.key === 'Escape') {
				onClose?.();
			}
		};

		window.addEventListener('mousedown', handleClick);
		window.addEventListener('keydown', handleEscKey);

		return () => {
			window.removeEventListener('mousedown', handleClick);
			window.removeEventListener('keydown', handleEscKey);
		};
	}, [onClose, onChange, isFormOpen]);
};
