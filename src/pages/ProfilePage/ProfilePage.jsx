import css from './ProfilePage.module.css';
import { UserCard } from '../../components/UserCard/UserCard';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import { useEffect, useRef, useState } from 'react';
import { CongratsModalWindow } from '../../components/CongratsModalWindow/CongratsModalWindow';
import { useSelector } from 'react-redux';
import { selectAddedPets } from '../../redux/auth/selectorsAuth';
import { MyNotices } from '../../components/MyNotices/MyNotices';

export const ProfilePage = () => {
  const [congratsModalIsOpen, setCongratsModalIsOpen] = useState(false);
  const addedPets = useSelector(selectAddedPets);
  const prevPetsLength = useRef(addedPets.length);

  // console.log('addedPets: ', addedPets.length);

  const openCongratsModal = () => setCongratsModalIsOpen(true);
  const closeCongratsModal = () => setCongratsModalIsOpen(false);

  useEffect(() => {
    if (prevPetsLength.current === 0 && addedPets.length === 1) {
      openCongratsModal();
    }

    prevPetsLength.current = addedPets.length;
  }, [addedPets.length]);

  return (
    <div className={css.conteiner}>
      <UserCard />
      <MyNotices />

      <ModalWindow isOpen={congratsModalIsOpen} onClose={closeCongratsModal}>
        <CongratsModalWindow closeModal={closeCongratsModal} />
      </ModalWindow>
    </div>
  );
};
