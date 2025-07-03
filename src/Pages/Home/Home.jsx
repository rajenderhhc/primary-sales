import React from 'react';
import './Home.css';

//import DivisionsSales from '../../components/DivisionsSales';
import Brand from '../../components/Brand';
import HqWiseSales from '../../components/HqWiseSales';
//import { TherapeuticGroup } from '../../components/TherapeuticGroup';
import Header from '../../components/Header';
import StateWiseSales from '../../components/StateWise';
import Footer from '../../components/Footer';
import CoustomerSales from '../../components/CustomerSales';

const Home = () => {
  document.title = 'Primary Sales | Dashboard';
  return (
    <div className='home-container'>
      <Header />
      <div className='row home_container'>
        <div className='col-md-6'>
          <Brand />
        </div>
        <div className='col-md-6'>
          <HqWiseSales />
        </div>
      </div>
      <div className='row pie-chart_container'>
        <div className='col-md-6'>
          <StateWiseSales />
        </div>
        <div className='col-md-6'>
          <CoustomerSales />
        </div>
      </div>
      <div className='row'>
        {/* <div className='col-md-6'>
          <TherapeuticGroup />
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
