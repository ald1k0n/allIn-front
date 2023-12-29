import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Modal } from '@/components';

export default function UserCreate() {
	const [isOpen, setIsOpen] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		navigate('/users');
	}, [isOpen, navigate]);

	return <Modal setIsOpen={setIsOpen}>UserCreate</Modal>;
}
