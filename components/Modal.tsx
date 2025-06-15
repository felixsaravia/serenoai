import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className={`bg-white rounded-xl shadow-2xl p-6 w-full ${sizeClasses[size]} transform transition-all duration-300 ease-out scale-95 animate-modal-pop`}>
        {title && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-night-blue">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Cerrar modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="max-h-[70vh] overflow-y-auto pr-2">
         {children}
        </div>
      </div>
      {/* Moved style tag to index.html or a global CSS file if preferred, but for component encapsulation it's sometimes here.
          However, per instructions, no separate CSS files or style attributes.
          The animation class animate-modal-pop needs to be defined in Tailwind config or via a <style> tag in index.html for global animations.
          For now, keeping it here as it was in the original file, but acknowledging the constraint.
          The best approach following instructions would be to add these keyframes to tailwind.config.js if possible, or live without the custom animation if restricted to only Tailwind classes.
          Given the strictness, I'll remove the style tag and assume the animation is either not critical or handled by Tailwind.
          If critical, the keyframes should be added to the script tag in index.html within tailwind.config.
      */}
      {/* <style>{`
        @keyframes modal-pop {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-modal-pop { animation: modal-pop 0.3s ease-out forwards; }
      `}</style> */}
    </div>
  );
};

// To make the animation work with Tailwind only, you'd add this to your tailwind.config.js (or in the <script> in index.html):
// theme: {
//   extend: {
//     keyframes: {
//       'modal-pop': {
//         '0%': { transform: 'scale(0.95)', opacity: '0' },
//         '100%': { transform: 'scale(1)', opacity: '1' },
//       },
//     },
//     animation: {
//       'modal-pop': 'modal-pop 0.3s ease-out forwards',
//     },
//   },
// },
// And then use className="... animate-modal-pop"

export default Modal;