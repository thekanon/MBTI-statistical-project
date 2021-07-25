from selenium import webdriver
import time
import sys #화면에 표시할때 인코딩을 맞춰주기 위한 모듈이다.
import io #화면에 표시할때 인코딩을 맞춰주기 위한 모듈이다.

sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8') #이부분이 없으면 콘솔에 출력하는것은 잘 되지만 노드로 데이터 전달이 안된다.
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8') #이부분이 없으면 콘솔에 출력하는것은 잘 되지만 노드로 데이터 전달이 안된다.

def parsingNamuwiki(name) :
    chromedriver = "C:\chromeweb\chromedriver.exe"

    options = webdriver.ChromeOptions()
    options.add_experimental_option("excludeSwitches", ["enable-logging"])
    driver = webdriver.Chrome(chromedriver,options=options)

    # driver = webdriver.Chrome(chromedriver)


    driver.get('https://namu.wiki/w/'+name)

    # print("+" * 100)
    # print(driver.title)
    # print(driver.current_url)
    # print("킹무위키 크롤링")
    # print("-" * 100)

    time.sleep(2)

    # 킹무위키 페이지 진입해서 프로필 테이블 추출
    allProfileElement = driver.find_elements_by_css_selector(
        "div.wiki-table-wrap.table-right")

    fStr = []
    cnt = 0
    # 나무위키 페이지 크롤링
    for item in allProfileElement:
        for itemSub in item.find_elements_by_css_selector('tr'):
            for lastItem in itemSub.find_elements_by_css_selector("td > div"):
                if(lastItem.find_elements_by_css_selector("strong")):
                    fStr.append({"title":"","description":""});
                    fStr[cnt]["title"] = lastItem.find_elements_by_css_selector("strong")[0].text;
                    # print("\n"+lastItem.find_elements_by_css_selector("strong")[0].text,end=' : ')
                # elif(lastItem.find_elements_by_css_selector("span")):
                #     fStr.append({"title":"","description":""});
                #     fStr[cnt]["title"] = lastItem.find_elements_by_css_selector("span")[0].text;                    
                else :
                    if(len(fStr)>cnt):
                        fStr[cnt]["description"] = lastItem.text
                        # print(lastItem.text)
                        cnt= cnt+1
    driver.quit()
    return fStr
if __name__ == '__main__': 
    print(parsingNamuwiki(sys.argv[1]))
