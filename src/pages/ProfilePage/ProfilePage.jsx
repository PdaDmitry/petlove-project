import css from './ProfilePage.module.css';
import { UserCard } from '../../components/UserCard/UserCard';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import { useEffect, useRef, useState } from 'react';
import { CongratsModalWindow } from '../../components/CongratsModalWindow/CongratsModalWindow';
import { useDispatch, useSelector } from 'react-redux';
import { selectAddedPets } from '../../redux/auth/selectorsAuth';
import { MyNotices } from '../../components/MyNotices/MyNotices';
// import { selectNoticesFavorites, selectPetsForFavorite } from '../../redux/pets/selectorsPets';
// import { selectNoticesFavorites } from '../../redux/pets/selectorsPets';
// import { fetchPetByIdThunk } from '../../redux/pets/operationsPets';

export const ProfilePage = () => {
  const [congratsModalIsOpen, setCongratsModalIsOpen] = useState(false);
  const dispatch = useDispatch();
  const addedPets = useSelector(selectAddedPets);
  const prevPetsLength = useRef(addedPets.length);

  // const petsForFavorite = useSelector(selectPetsForFavorite);
  // const noticesFavorites = useSelector(selectNoticesFavorites);

  // const arrFavoritPets = petsForFavorite ? petsForFavorite : noticesFavorites;

  // const noticesFavorites = useSelector(selectNoticesFavorites);

  // useEffect(() => {
  //   if (noticesFavorites?.length) {
  //     noticesFavorites.map(id => dispatch(fetchPetByIdThunk(id)));
  //   }
  // }, [dispatch, noticesFavorites]);

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
