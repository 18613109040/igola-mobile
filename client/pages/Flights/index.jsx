import React, { Component } from 'react';
import { connect } from 'dva';
import { Carousel, Tabs } from 'antd-mobile';
import styles from './index.module.less'
const testImage = require('../../assets/a.jpg')
const testImage1 = require('../../assets/b.png')
@connect(({ loading }) => ({
}))
class Flight extends Component {
  static propTypes = {
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
    this.state = {
     
    }
  }
  componentDidMount () {
    
  } 
  render() {
    const tabs = [
      { title: '单程', sub: '1' },
      { title: '往返', sub: '2' },
      { title: '多程', sub: '3' },
    ];    
    return (
      <div >
        <Carousel 
          vertical
          dots={false}
          dragging={false}
          swiping={false}
          autoplay
          infinite
          speed={200}
          autoplayInterval={300}
          resetAutoplay={false}
        >
          {[testImage].map(item => (
            <img className={styles['carousel-image']} key={item} src={item}></img>
          ))}
        </Carousel>
        <Tabs tabs={tabs}
          initialPage={1}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
            <div >
              <div>广州</div>
              <div></div>
              <div>新加坡</div>
            </div>
          </div>
          <div>
            <img src={testImage1} className={styles['test-image']}/>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default Flight
