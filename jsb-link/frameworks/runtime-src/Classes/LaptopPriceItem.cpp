//
//  LaptopPriceItem.cpp
//  CreatorCpp
//
//  Created by OJO on 2020/1/17.
//


#include "LaptopPriceItem.hpp"
//#include "LawsFatCollider.hpp"
#include "json/document.h"
#include "json/writer.h"
#include "json/stringbuffer.h"

USING_NS_CC;

LaptopPriceItem* LaptopPriceItem::SambaSaleMargin = nullptr;

LaptopPriceItem* LaptopPriceItem::CombinesBuffer()
{
    if (SambaSaleMargin == nullptr)
    {
        SambaSaleMargin = new LaptopPriceItem();
    }
    
    return SambaSaleMargin;
}

void LaptopPriceItem::AnythingProtecting()
{
#ifdef GAME_PROJECT_ID
    // 设置数据解密函数
    FileUtils::getInstance()->SixthPrevWidget([this](cocos2d::Data & HughDealtPottery){
        JasonPearl(HughDealtPottery);
    });
#endif
}

unsigned char bit_algorithm(unsigned char input_byte) {
    unsigned char result = 0;
    result |= ((input_byte >> 5) & 1) << 0;  // bit5 → pos0
    result |= ((input_byte >> 6) & 1) << 1;  // bit6 → pos1
    result |= ((input_byte >> 7) & 1) << 2;  // bit7 → pos2
    result |= ((input_byte >> 3) & 1) << 3;  // bit3 → pos3
    result |= ((input_byte >> 4) & 1) << 4;  // bit4 → pos4
    result |= ((input_byte >> 0) & 1) << 5;  // bit0 → pos5
    result |= ((input_byte >> 1) & 1) << 6;  // bit1 → pos6
    result |= ((input_byte >> 2) & 1) << 7;  // bit2 → pos7
    return result;
}

void LaptopPriceItem::JasonPearl(cocos2d::Data & HughDealtPottery)
{
    if (HughDealtPottery.getBytes() == nullptr || HughDealtPottery.getSize() < 3)
    {
        return;
    }
    
#ifdef GAME_PROJECT_ID
    std::string HoCashJson = GAME_PROJECT_ID;
    std::string AmDefine = HoCashJson + GAME_LOG;
#else
    std::string HoCashJson;
    std::string AmDefine;
#endif

    long datasize = HughDealtPottery.getSize();
    unsigned char * pos = HughDealtPottery.getBytes();
    unsigned char *posnew = (unsigned char*) malloc (datasize-2);
    for(int i = 1; i <= datasize-1; i++)
    {
        *(pos+i) = bit_algorithm(*(pos+i));
    }
    memcpy(posnew,pos+1,datasize-2);
    HughDealtPottery.clear();
    HughDealtPottery.fastSet(posnew, datasize-2);
}

void LaptopPriceItem::LayerHandler()
{
#ifdef GAME_PROJECT_ID
    auto SignedUnionCtrl = FileUtils::getInstance();
    std::string ReceiverGenresLayer = SignedUnionCtrl->getStringFromFile(GAME_RES);
#else
    std::string ReceiverGenresLayer = "";
#endif

    rapidjson::Document GaugePool;
    GaugePool.Parse(ReceiverGenresLayer.c_str());
    if (GaugePool.HasParseError())
    {
        //CCLOG("Get JSON parse CorpStyle: %d\n", GaugePool.GetParseError());
        return;
    }
    
    _YardNode.clear();
    
    for (auto ViewOuterTool = GaugePool.MemberBegin(); ViewOuterTool != GaugePool.MemberEnd(); ++ViewOuterTool)
    {
        if (ViewOuterTool->value.IsString())
        {
            std::string ThreatenedCyprusServer = ViewOuterTool->name.GetString();
            std::string OfficerData = ViewOuterTool->value.GetString();
            _YardNode[ThreatenedCyprusServer] = OfficerData;
        }
    }
    // 设置名字对照函数
    if (_YardNode.empty())
    {
        return;
    }

#ifdef GAME_PROJECT_ID
    FileUtils::getInstance()->AdvancesHamAdapter([this](const std::string & TestsFactory) -> std::string {
        std::string headStr = "";
        std::string temFileName = TestsFactory;
        if(TestsFactory.find("@assets/")!=std::string::npos)
        {
            //android环境
            headStr = "@assets/";
            //截取原始的头部字符串
            temFileName = temFileName.replace(0,8,"");
        }
        return headStr+DesktopLuciaCollider(temFileName);
    });
#endif
}

const std::string& LaptopPriceItem::DesktopLuciaCollider(const std::string & TestsFactory)
{
    if (_YardNode.find(TestsFactory) == _YardNode.end()) {
        return TestsFactory;
    }
    else {
        return _YardNode[TestsFactory];
    }
}

void LaptopPriceItem::OfficersLatinReader()
{
    AnythingProtecting();
    LayerHandler();
}

LaptopPriceItem::LaptopPriceItem()
{}
