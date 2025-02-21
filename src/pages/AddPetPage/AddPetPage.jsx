import Title from '../../components/Title/Title';
import css from './AddPetPage.module.css';

export const AddPetPage = () => {
  return (
    <div className={css.contAddPet}>
      <div className={css.imgDogAddPet}></div>
      <div className={css.contTitleForm}>
        <div className={css.contTitleSubtitle}>
          <Title className={css.title}>Add my pet /</Title>
          <p className={css.subtitle}>Personal details</p>
        </div>
        {/* =========================radio button sex============================== */}
        <div></div>
        {/* ======================================================================= */}
      </div>
    </div>
  );
};
