import css from './ProfilePage.module.css';
import { UserCard } from '../../components/UserCard/UserCard';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import { useEffect, useRef, useState } from 'react';
import { CongratsModalWindow } from '../../components/CongratsModalWindow/CongratsModalWindow';
import { useDispatch, useSelector } from 'react-redux';
import { selectAddedPets } from '../../redux/auth/selectorsAuth';
import { MyNotices } from '../../components/MyNotices/MyNotices';
import { refreshUser } from '../../redux/auth/operationsAuth';

export const ProfilePage = () => {
  const [congratsModalIsOpen, setCongratsModalIsOpen] = useState(false);
  const dispatch = useDispatch();
  const addedPets = useSelector(selectAddedPets);
  const prevPetsLength = useRef(addedPets.length);

  const openCongratsModal = () => setCongratsModalIsOpen(true);
  const closeCongratsModal = () => setCongratsModalIsOpen(false);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  useEffect(() => {
    if (prevPetsLength.current === 0 && addedPets.length === 1) {
      openCongratsModal();
    }

    prevPetsLength.current = addedPets.length;
  }, [addedPets.length]);

  return (
    <div className={css.conteiner}>
      <div className={css.contElements}>
        <UserCard />
        <MyNotices />
      </div>

      <ModalWindow isOpen={congratsModalIsOpen} onClose={closeCongratsModal}>
        <CongratsModalWindow closeModal={closeCongratsModal} />
      </ModalWindow>
    </div>
  );
};
