import ReactModal from 'react-modal';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Styles } from 'react-modal';

export interface AppModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    children: ReactNode;
    contentLabel?: string;
    shouldHideOnOutsideClick?: boolean;
    style?: Styles;
    className?: string;
    overlayClassName?: string;
    onAfterOpen?: () => void;
    ariaHideApp?: boolean;
    appElementSelector?: string; // e.g. '#root'
}

export default function Modal({
    isOpen,
    onRequestClose,
    children,
    contentLabel,
    shouldHideOnOutsideClick = true,
    style,
    className,
    overlayClassName,
    onAfterOpen,
    ariaHideApp = true,
    appElementSelector = '#root'
}: AppModalProps) {
   

    useEffect(() => {
        if (ariaHideApp) {
            ReactModal.setAppElement(appElementSelector);
        }
    }, [ariaHideApp, appElementSelector]);

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={contentLabel}
            shouldCloseOnOverlayClick={shouldHideOnOutsideClick}
            style={style}
            className={className}
            overlayClassName={overlayClassName}
            onAfterOpen={onAfterOpen}
            ariaHideApp={ariaHideApp}
        >
            {children}
        </ReactModal>
    );
}

