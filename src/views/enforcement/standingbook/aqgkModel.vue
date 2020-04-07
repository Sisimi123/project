<!-- 港口 -->
<style lang="less" scoped>
    @import "../../../styles/commonStyle.less";
    </style>    
    <template>
        <Modal 
            v-model="visible" 
            :closable="closable"
            :maskClosable="maskClosable"
            :title="title"
            width="40%"
            :okText="okText"
            :cancelText="cancelText"
            :loading="loading"
            :styles="styles"
            :class="className"
            :footerHide="footerHide"
            :scrollable="scrollable"
            :transitionNames="transitionNames"
            :transfer="transfer"
            @on-ok="ok"
            @on-cancel="cancel"
            @on-visible-change="visibleChange">
            <div style="height:600px;overflow:auto;">
                <table style="width:100%;" class="gk">
                    <caption><h2>港口</h2></caption>
                    <tr>
                        <td></td>
                        <td colspan="2">PORTNAME</td>
                        <td>COUNTRY</td>
                        <td>NATION</td>
                        <td>CITY</td>
                        <td>VILLAGE</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td colspan="2">绿华渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>嵊泗</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td colspan="2">嵊山港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>嵊泗</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colspan="2">黄龙锚区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>嵊泗</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td colspan="2">马迹港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>嵊泗</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td colspan="2">浪潭观音礁渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>洞头</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td colspan="2">双山港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>宁波</td>
                        <td>奉化</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td colspan="2">南峰渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>岱山</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td colspan="2">后背岙渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>岱山</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td colspan="2">桃花渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>普陀</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td colspan="2">漩门渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>玉环</td>
                    </tr>
                    <tr>
                        <td>11</td>
                        <td colspan="2">东矶港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>临海</td>
                    </tr>
                    <tr>
                        <td>12</td>
                        <td colspan="2">岱山县大衢渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>岱山</td>
                    </tr>
                    <tr>
                        <td>13</td>
                        <td colspan="2">东门渔业港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>宁波</td>
                        <td>象山</td>
                    </tr>
                    <tr>
                        <td>14</td>
                        <td colspan="2">达岛渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>临海</td>
                    </tr>
                    <tr>
                        <td>15</td>
                        <td colspan="2">口筐渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>洞头</td>
                    </tr>
                    <tr>
                        <td>16</td>
                        <td colspan="2">温州海洋渔业公司基地</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>龙湾</td>
                    </tr>
                    <tr>
                        <td>17</td>
                        <td colspan="2">铜盘渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>瑞安</td>
                    </tr>
                    <tr>
                        <td>18</td>
                        <td colspan="2">北麂渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>瑞安</td>
                    </tr>
                    <tr>
                        <td>19</td>
                        <td colspan="2">路桥区金清渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>路桥</td>
                    </tr>
                    <tr>
                        <td>20</td>
                        <td colspan="2">塘头渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>普陀</td>
                    </tr>
                    <tr>
                        <td>21</td>
                        <td colspan="2">南港渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>嵊泗</td>
                    </tr>
                    <tr>
                        <td>22</td>
                        <td colspan="2">小李岙渔业港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>定海</td>
                    </tr>
                    <tr>
                        <td>23</td>
                        <td colspan="2">马目渔业港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>定海</td>
                    </tr>
                    <tr>
                        <td>24</td>
                        <td colspan="2">倪北布袋岙渔业港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>洞头</td>
                    </tr>
                    <tr>
                        <td>25</td>
                        <td colspan="2">东沙渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>洞头</td>
                    </tr>
                    <tr>
                        <td>26</td>
                        <td colspan="2">元觉状元岙渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>洞头</td>
                    </tr>
                    <tr>
                        <td>27</td>
                        <td colspan="2">峙头渔业港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>宁波</td>
                        <td>北仑</td>
                    </tr>
                    <tr>
                        <td>28</td>
                        <td colspan="2">册子渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>定海</td>
                    </tr>
                    <tr>
                        <td>29</td>
                        <td colspan="2">秀山渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>岱山</td>
                    </tr>
                    <tr>
                        <td>30</td>
                        <td colspan="2">观岙渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>温岭</td>
                    </tr>
                    <tr>
                        <td>31</td>
                        <td colspan="2">大麦屿渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>玉环</td>
                    </tr>
                    <tr>
                        <td>32</td>
                        <td colspan="2">鹿西渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>洞头</td>
                    </tr>
                    <tr>
                        <td>33</td>
                        <td colspan="2">宏伟渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>宁波</td>
                        <td>宁海</td>
                    </tr>
                    <tr>
                        <td>34</td>
                        <td colspan="2">大渔渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>苍南</td>
                    </tr>
                    <tr>
                        <td>35</td>
                        <td colspan="2">北龙渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>瑞安</td>
                    </tr>
                    <tr>
                        <td>36</td>
                        <td colspan="2">杏湾渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>乐清</td>
                    </tr>
                    <tr>
                        <td>37</td>
                        <td colspan="2">一江山岛渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>椒江</td>
                    </tr>
                    <tr>
                        <td>38</td>
                        <td colspan="2">三蒜渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>温岭</td>
                    </tr>
                    <tr>
                        <td>39</td>
                        <td colspan="2">洞港渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>三门</td>
                    </tr>
                    <tr>
                        <td>40</td>
                        <td colspan="2">乌岩渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>玉环</td>
                    </tr>
                    <tr>
                        <td>41</td>
                        <td colspan="2">西湾港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>苍南</td>
                    </tr>
                    <tr>
                        <td>42</td>
                        <td colspan="2">海盐渔港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>嘉兴</td>
                        <td>海盐</td>
                    </tr>
                    <tr>
                        <td>43</td>
                        <td colspan="2">大榭渔业港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>宁波</td>
                        <td>大榭</td>
                    </tr>
                    <tr>
                        <td>44</td>
                        <td colspan="2">山海渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>嵊泗</td>
                    </tr>
                    <tr>
                        <td>45</td>
                        <td colspan="2">长涂渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>岱山</td>
                    </tr>
                    <tr>
                        <td>46</td>
                        <td colspan="2">海滨港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>路桥</td>
                    </tr>
                    <tr>
                        <td>47</td>
                        <td colspan="2">海游渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>三门</td>
                    </tr>
                    <tr>
                        <td>48</td>
                        <td colspan="2">灵门渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>玉环</td>
                    </tr>
                    <tr>
                        <td>49</td>
                        <td colspan="2">秀东渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>岱山</td>
                    </tr>
                    <tr>
                        <td>50</td>
                        <td colspan="2">临海浦渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>宁波</td>
                        <td>余姚</td>
                    </tr>
                    <tr>
                        <td>51</td>
                        <td colspan="2">中墩渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>苍南</td>
                    </tr>
                    <tr>
                        <td>52</td>
                        <td colspan="2">高亭中心渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>岱山</td>
                    </tr>
                    <tr>
                        <td>53</td>
                        <td colspan="2">蒲岐渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>乐清</td>
                    </tr>
                    <tr>
                        <td>54</td>
                        <td colspan="2">金平渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>嵊泗</td>
                    </tr>
                    <tr>
                        <td>55</td>
                        <td colspan="2">大巨南岙渔业港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>洞头</td>
                    </tr>
                    <tr>
                        <td>56</td>
                        <td colspan="2">东极渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>普陀</td>
                    </tr>
                    <tr>
                        <td>57</td>
                        <td colspan="2">园山港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>宁波</td>
                        <td>宁海</td>
                    </tr>
                    <tr>
                        <td>58</td>
                        <td colspan="2">大长途山</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>岱山</td>
                    </tr>
                    <tr>
                        <td>59</td>
                        <td colspan="2">薛岙渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>宁波</td>
                        <td>宁海</td>
                    </tr>
                    <tr>
                        <td>60</td>
                        <td colspan="2">桐照渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>宁波</td>
                        <td>奉化</td>
                    </tr>
                    <tr>
                        <td>61</td>
                        <td colspan="2">温州市鱼市场码头</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>鹿城</td>
                    </tr>
                    <tr>
                        <td>62</td>
                        <td colspan="2">百岱渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>乐清</td>
                    </tr>
                    <tr>
                        <td>63</td>
                        <td colspan="2">南策西岙渔业港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>洞头</td>
                    </tr>
                    <tr>
                        <td>64</td>
                        <td colspan="2">清水埠渔业港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>永嘉</td>
                    </tr>
                    <tr>
                        <td>65</td>
                        <td colspan="2">西码头渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>定海</td>
                    </tr>
                    <tr>
                        <td>66</td>
                        <td colspan="2">椒江渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>椒江</td>
                    </tr>
                    <tr>
                        <td>67</td>
                        <td colspan="2">白峰渔业渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>宁波</td>
                        <td>北仑</td>
                    </tr>
                    <tr>
                        <td>68</td>
                        <td colspan="2">月岙渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>普陀</td>
                    </tr>
                    <tr>
                        <td>69</td>
                        <td colspan="2">大水坑渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>嵊泗</td>
                    </tr>
                    <tr>
                        <td>70</td>
                        <td colspan="2">东山埠渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>嵊泗</td>
                    </tr>
                    <tr>
                        <td>71</td>
                        <td colspan="2">东山埠渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>瑞安</td>
                    </tr>
                    <tr>
                        <td>72</td>
                        <td colspan="2">元觉花岗渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>洞头</td>
                    </tr>
                    <tr>
                        <td>73</td>
                        <td colspan="2">渔山渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>岱山</td>
                    </tr>
                    <tr>
                        <td>74</td>
                        <td colspan="2">五星渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>普陀</td>
                    </tr>
                    <tr>
                        <td>75</td>
                        <td colspan="2">龙山港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>普陀</td>
                    </tr>
                    <tr>
                        <td>76</td>
                        <td colspan="2">横床渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>玉环</td>
                    </tr>
                    <tr>
                        <td>77</td>
                        <td colspan="2">披山渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>玉环</td>
                    </tr>
                    <tr>
                        <td>78</td>
                        <td colspan="2">南塘渔业港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>乐清</td>
                    </tr>
                    <tr>
                        <td>79</td>
                        <td colspan="2">鹿西东臼渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>洞头</td>
                    </tr>
                    <tr>
                        <td>80</td>
                        <td colspan="2">大嵩港港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>宁波</td>
                        <td>鄞州</td>
                    </tr>
                    <tr>
                        <td>81</td>
                        <td colspan="2">郭巨港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>宁波</td>
                        <td>大榭</td>
                    </tr>
                    <tr>
                        <td>82</td>
                        <td colspan="2">国庆渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>宁波</td>
                        <td>宁海</td>
                    </tr>
                    <tr>
                        <td>83</td>
                        <td colspan="2">兰田港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>龙湾</td>
                    </tr>
                    <tr>
                        <td>84</td>
                        <td colspan="2">清江渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>乐清</td>
                    </tr>
                    <tr>
                        <td>85</td>
                        <td colspan="2">大陈渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>椒江</td>
                    </tr>
                    <tr>
                        <td>86</td>
                        <td colspan="2">长山嘴渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>玉环</td>
                    </tr>
                    <tr>
                        <td>87</td>
                        <td colspan="2">南麂港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>平阳</td>
                    </tr>
                    <tr>
                        <td>88</td>
                        <td colspan="2">樟州渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>普陀</td>
                    </tr>
                    <tr>
                        <td>89</td>
                        <td colspan="2">新洋渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>玉环</td>
                    </tr>
                    <tr>
                        <td>90</td>
                        <td colspan="2">虞北港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>宁波</td>
                        <td>上虞</td>
                    </tr>
                    <tr>
                        <td>91</td>
                        <td colspan="2">浪潭潭头渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>洞头</td>
                    </tr>
                    <tr>
                        <td>92</td>
                        <td colspan="2">茅诞渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>玉环</td>
                    </tr>
                    <tr>
                        <td>93</td>
                        <td colspan="2">鸡山港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>玉环</td>
                    </tr>
                    <tr>
                        <td>94</td>
                        <td colspan="2">健跳渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>三门</td>
                    </tr>
                    <tr>
                        <td>95</td>
                        <td colspan="2">象山县鹤蒲渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>宁波</td>
                        <td>象山</td>
                    </tr>
                    <tr>
                        <td>96</td>
                        <td colspan="2">石砰渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>苍南</td>
                    </tr>
                    <tr>
                        <td>97</td>
                        <td colspan="2">礁山渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>温岭</td>
                    </tr>
                    <tr>
                        <td>98</td>
                        <td colspan="2">下川山</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>岱山</td>
                    </tr>
                    <tr>
                        <td>99</td>
                        <td colspan="2">三盘港屿仔渔业港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>洞头</td>
                    </tr>
                    <tr>
                        <td>100</td>
                        <td colspan="2">峡山渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>宁波</td>
                        <td>宁海</td>
                    </tr>
                    <tr>
                        <td>101</td>
                        <td colspan="2">旗门港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>宁波</td>
                        <td>宁海</td>
                    </tr>
                    <tr>
                        <td>102</td>
                        <td colspan="2">蟹钳港避风锚地渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>宁波</td>
                        <td>象山</td>
                    </tr>
                    <tr>
                        <td>103</td>
                        <td colspan="2">岑港渔业港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>定海</td>
                    </tr>
                    <tr>
                        <td>104</td>
                        <td colspan="2">环礁渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>玉环</td>
                    </tr>
                    <tr>
                        <td>105</td>
                        <td colspan="2">五龙会城渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>嵊泗</td>
                    </tr>
                    <tr>
                        <td>106</td>
                        <td colspan="2">岭港渔业港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>定海</td>
                    </tr>
                    <tr>
                        <td>107</td>
                        <td colspan="2">长白渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>定海</td>
                    </tr>
                    <tr>
                        <td>108</td>
                        <td colspan="2">毛峙渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>定海</td>
                    </tr>
                    <tr>
                        <td>109</td>
                        <td colspan="2">双合渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>岱山</td>
                    </tr>
                    <tr>
                        <td>110</td>
                        <td colspan="2">葫芦渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>普陀</td>
                    </tr>
                    <tr>
                        <td>111</td>
                        <td colspan="2">河泥漕渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>普陀</td>
                    </tr>
                    <tr>
                        <td>112</td>
                        <td colspan="2">温岭中心渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>温岭</td>
                    </tr>
                    <tr>
                        <td>113</td>
                        <td colspan="2">龙山渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>普陀</td>
                    </tr>
                    <tr>
                        <td>114</td>
                        <td colspan="2">西山渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>宁波</td>
                        <td>慈溪</td>
                    </tr>
                    <tr>
                        <td>115</td>
                        <td colspan="2">螺门渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>普陀</td>
                    </tr>
                    <tr>
                        <td>116</td>
                        <td colspan="2">霞关渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>苍南</td>
                    </tr>
                    <tr>
                        <td>117</td>
                        <td colspan="2">苍南中心渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>苍南</td>
                    </tr>
                    <tr>
                        <td>118</td>
                        <td colspan="2">炎亭渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>苍南</td>
                    </tr>
                    <tr>
                        <td>119</td>
                        <td colspan="2">七都渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>鹿城</td>
                    </tr>
                    <tr>
                        <td>120</td>
                        <td colspan="2">梁横山港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>普陀</td>
                    </tr>
                    <tr>
                        <td>121</td>
                        <td colspan="2">红脚岩渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>临海</td>
                    </tr>
                    <tr>
                        <td>122</td>
                        <td colspan="2">栈台渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>玉环</td>
                    </tr>
                    <tr>
                        <td>123</td>
                        <td colspan="2">台门渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>普陀</td>
                    </tr>
                    <tr>
                        <td>124</td>
                        <td colspan="2">火车渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>玉环</td>
                    </tr>
                    <tr>
                        <td>125</td>
                        <td colspan="2">五龙渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>嵊泗</td>
                    </tr>
                    <tr>
                        <td>126</td>
                        <td colspan="2">岙山港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>嵊泗</td>
                    </tr>
                    <tr>
                        <td>127</td>
                        <td colspan="2">岙山港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>定海</td>
                    </tr>
                    <tr>
                        <td>128</td>
                        <td colspan="2">舟山中心渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>定海</td>
                    </tr>
                    <tr>
                        <td>129</td>
                        <td colspan="2">倪南正岙渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>洞头</td>
                    </tr>
                    <tr>
                        <td>130</td>
                        <td colspan="2">燕窝山渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>岱山</td>
                    </tr>
                    <tr>
                        <td>131</td>
                        <td colspan="2">小欢喜渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>岱山</td>
                    </tr>
                    <tr>
                        <td>132</td>
                        <td colspan="2">新道头渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>岱山</td>
                    </tr>
                    <tr>
                        <td>133</td>
                        <td colspan="2">沙岙渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>普陀</td>
                    </tr>
                    <tr>
                        <td>134</td>
                        <td colspan="2">蚂蚁渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>普陀</td>
                    </tr>
                    <tr>
                        <td>135</td>
                        <td colspan="2">车关渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>温岭</td>
                    </tr>
                    <tr>
                        <td>136</td>
                        <td colspan="2">温州内河停泊区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>青田</td>
                    </tr>
                    <tr>
                        <td>137</td>
                        <td colspan="2">三盘港埠阜岙渔业港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>洞头</td>
                    </tr>
                    <tr>
                        <td>138</td>
                        <td colspan="2">横山港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>宁波</td>
                        <td>鄞州</td>
                    </tr>
                    <tr>
                        <td>139</td>
                        <td colspan="2">龙港渔业港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>苍南</td>
                    </tr>
                    <tr>
                        <td>140</td>
                        <td colspan="2">乌沙门渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>普陀</td>
                    </tr>
                    <tr>
                        <td>141</td>
                        <td colspan="2">小潮港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>普陀</td>
                    </tr>
                    <tr>
                        <td>142</td>
                        <td colspan="2">坎门渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>玉环</td>
                    </tr>
                    <tr>
                        <td>143</td>
                        <td colspan="2">乍浦山湾渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>嘉兴</td>
                        <td>平湖</td>
                    </tr>
                    <tr>
                        <td>144</td>
                        <td colspan="2">登步渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>普陀</td>
                    </tr>
                    <tr>
                        <td>145</td>
                        <td colspan="2">佛渡渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>普陀</td>
                    </tr>
                    <tr>
                        <td>146</td>
                        <td colspan="2">虾峙渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>普陀</td>
                    </tr>
                    <tr>
                        <td>147</td>
                        <td colspan="2">嵊泗中心渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>嵊泗</td>
                    </tr>
                    <tr>
                        <td>148</td>
                        <td colspan="2">枸杞渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>嵊泗</td>
                    </tr>
                    <tr>
                        <td>149</td>
                        <td colspan="2">大门头岩渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>洞头</td>
                    </tr>
                    <tr>
                        <td>150</td>
                        <td colspan="2">洞头中心渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>洞头</td>
                    </tr>
                    <tr>
                        <td>151</td>
                        <td colspan="2">沈家门渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>普陀</td>
                    </tr>
                    <tr>
                        <td>152</td>
                        <td colspan="2">花鸟渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>嵊泗</td>
                    </tr>
                    <tr>
                        <td>153</td>
                        <td colspan="2">湖泥渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>普陀</td>
                    </tr>
                    <tr>
                        <td>154</td>
                        <td colspan="2">小洋山港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>嵊泗</td>
                    </tr>
                    <tr>
                        <td>155</td>
                        <td colspan="2">大青渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>玉环</td>
                    </tr>
                    <tr>
                        <td>156</td>
                        <td colspan="2">长白岛港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>定海</td>
                    </tr>
                    <tr>
                        <td>157</td>
                        <td colspan="2">马关渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>嵊泗</td>
                    </tr>
                    <tr>
                        <td>158</td>
                        <td colspan="2">小黄沙港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>嵊泗</td>
                    </tr>
                    <tr>
                        <td>159</td>
                        <td colspan="2">灵昆渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>龙湾</td>
                    </tr>
                    <tr>
                        <td>160</td>
                        <td colspan="2">龙湾渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>玉环</td>
                    </tr>
                    <tr>
                        <td>161</td>
                        <td colspan="2">白马岙渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>玉环</td>
                    </tr>
                    <tr>
                        <td>162</td>
                        <td colspan="2">海门港岩头闸渔业港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>椒江</td>
                    </tr>
                    <tr>
                        <td>163</td>
                        <td colspan="2">洪溪渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>宁波</td>
                        <td>奉化</td>
                    </tr>
                    <tr>
                        <td>164</td>
                        <td colspan="2">镇海渔业港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>宁波</td>
                        <td>镇海</td>
                    </tr>
                    <tr>
                        <td>165</td>
                        <td colspan="2">胡陈港渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>宁波</td>
                        <td>宁海</td>
                    </tr>
                    <tr>
                        <td>166</td>
                        <td colspan="2">湖头渡渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>宁波</td>
                        <td>奉化</td>
                    </tr>
                    <tr>
                        <td>167</td>
                        <td colspan="2">渔寮渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>苍南</td>
                    </tr>
                    <tr>
                        <td>168</td>
                        <td colspan="2">三山渔业港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>温州</td>
                        <td>乐清</td>
                    </tr>
                    <tr>
                        <td>169</td>
                        <td colspan="2">龙门港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>温岭</td>
                    </tr>
                    <tr>
                        <td>170</td>
                        <td colspan="2">箬山渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>温岭</td>
                    </tr>
                    <tr>
                        <td>171</td>
                        <td colspan="2">日岙渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>台州</td>
                        <td>玉环</td>
                    </tr>
                    <tr>
                        <td>172</td>
                        <td colspan="2">石浦渔业港区</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>宁波</td>
                        <td>象山</td>
                    </tr>
                    <tr>
                        <td>173</td>
                        <td colspan="2">爵溪渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>宁波</td>
                        <td>象山</td>
                    </tr>
                    <tr>
                        <td>174</td>
                        <td colspan="2">白沙渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>普陀</td>
                    </tr>
                    <tr>
                        <td>175</td>
                        <td colspan="2">黄石渔港</td>
                        <td>中国</td>
                        <td>浙江</td>
                        <td>舟山</td>
                        <td>普陀</td>
                    </tr>
                </table>
            </div>
            <div slot="footer">
                <Button type="success" size="large" @click="okGK">保存</Button>
            </div>
        </Modal>
    </template>
    
    <script>
    export default {
        name: "aqgkModal",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            closable: {
                type: Boolean,
                default: true
            },
            maskClosable: {
                type: Boolean,
                default: true
            },
            title: {
                type: String,
                default: "详情"
            },
            okText: {
                type: String
            },
            cancelText: {
                type: String
            },
            loading: {
                type: Boolean,
                default: false
            },
            styles: {
                type: Object
            },
            className: {
                type: String,
                default:"vertical-center-modal"
            },
            // for instance
            footerHide: {
                type: Boolean,
                default: false
            },
            scrollable: {
                type: Boolean,
                default: false
            },
            transitionNames: {
                type: Array,
                default () {
                    return ['ease', 'fade'];
                }
            },
            transfer: {
                type: Boolean,
                default: true
            },
            unid: {
                type: String,
                default: ""
            },
            shipId: {
                type: String,
                default: ""
            },
            nametheShip: {
                type: String,
                default: ""
            }
        },
        data () {
            return {
                visible: this.value,
                modalGK:{
                    portName:"",//港口名称
                    country:"",//国籍
                    nation:"",//省级
                    city:"",//市级
                    village:"",//乡镇
                    path:"",//路径地址
                    parentId:"",
                    note:"",//备注
                    jd:"",//经度
                    wd:"",//纬度
                },
            };
        },
        methods: {
            ok() {
                if (!this.loading)
                    this.$emit("input",this.visible);
                this.$emit("on-ok");
            },
            cancel() {
                this.$emit("input",this.visible);
                this.$emit("on-cancel");
            },
            visibleChange(val) {
                this.$emit("on-visible-change",val);
            },
            okGK(){
                this.$http
                .post("/sea/port",this.modalGK)
                .then(res => {
                    console.log(res,"你好");
                    if(res.code>0){
                        this.value=false;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            },
            search(){
                this.$emit("inputGK",this.value);
            },
        },
        watch:{
            value(val){
                this.visible=this.value;
                this.search();
                console.log(this.value);
            }
        }
    };
    </script>
<style scoped>
    table.gk{
    border-collapse: collapse;
    margin-bottom: 10px;
    }
    /*船员安全责任书签署现场照片PIC*/
    table.gk td{
    border:1px solid black;
    width:105px;
    height:32px;
    text-align:center;
    }
    table.zxk input{
    border:none;
    outline:none;
    width:100%;
    box-sizing:border-box;
    padding:0;
    margin:0;
    }
    </style> 
    
    