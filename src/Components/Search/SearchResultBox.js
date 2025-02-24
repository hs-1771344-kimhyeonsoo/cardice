import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {getFloatFixed, getRangeText, getColorRating, getColorWeight, getTextWeight} from "../../Modules/util";
import SearchResultInfoBox from "./SearchResultInfoBox";
import SearchResultYoutubeBox from "./SearchResultYoutubeBox";

const SearchResultBoxWrapper = styled.div`
    height: 160px;
    margin: 20px 0 20px 0;
    padding: 0 20px 0 20px;
    border-radius: 10px;
    background-color: var(--gray-02);
`

const SearchResultImage = styled.div`
    width: 140px;
    height: 140px;
    border-radius: 10px;
    background-size: cover;
    background-position: top center;
    background-repeat: no-repeat;
    background-image: ${(props) => `url(${props.$imgURL})`};
`

const SearchResultInfosWrapper = styled.div`
    width: ${(props) => `${props.$width}px`};
    height: 140px;
`

const SearchResultButton = styled.button`
    color: var(--blue-00);
    background-color: transparent;
`

const SearchResultBox = ({gameData, windowWidth, componentSize}) => {
    const navigate = useNavigate();
    return(
        <SearchResultBoxWrapper className="frow fjsbetween facenter">
            <SearchResultImage $imgURL={gameData.image} />
            <SearchResultInfosWrapper className="fcol fjsbetween" $width={componentSize.infoBoxWidth - 200}>
                <div className="frow fjsbetween faend">
                    <div className="font6">{gameData.title}</div>
                    {windowWidth >= 840 ? null : <SearchResultButton>{'설명영상'}</SearchResultButton>}
                </div>
                <div className="frow">
                    <SearchResultInfoBox componentSize={componentSize} type={'평점'} text={`★ ${getFloatFixed(gameData.rating, 1)}`} color={getColorRating(gameData.rating)} />
                    <SearchResultInfoBox componentSize={componentSize} type={'인원'} text={getRangeText(gameData.player[0], gameData.player[1]) + '인'} color={getColorWeight(0)} />
                    <SearchResultInfoBox componentSize={componentSize} type={'플레이 시간'} text={getRangeText(gameData.playTime[0], gameData.playTime[1]) + '분'} color={getColorWeight(0)} />
                    <SearchResultInfoBox componentSize={componentSize} type={'난이도'} text={getTextWeight(gameData.weight)} color={getColorWeight(gameData.weight)} />
                    {windowWidth >= 840 ? <SearchResultYoutubeBox width={100} height={50} /> : null}
                </div>
                <div className="frow fjsbetween">
                    <div>{gameData.system.map(s => '#' + s).join(` `)}</div>
                    <SearchResultButton onClick={() => navigate(`/detail?id=${gameData.id}`)}>{'자세히보기'}</SearchResultButton>
                </div>
            </SearchResultInfosWrapper>
        </SearchResultBoxWrapper>
    );
}

export default SearchResultBox;