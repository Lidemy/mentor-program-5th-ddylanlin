/* eslint-disable import/no-unresolved, no-unused-vars */
import styled from 'styled-components'

const MEDIA_QUERY_MD = '@media screen and (min-width: 768px)'

const InputBlock = styled.div`
  margin: .5rem 0 1.5rem 0;
  display: flex;
  position: relative;
  ${MEDIA_QUERY_MD}{
    flex-direction: column;
    padding-bottom: 1.5rem;
  }
`
const InputTitle = styled.label`
  ${MEDIA_QUERY_MD}{
    font-size: 2rem;
  }
`
const InputField = styled.input`
  flex-grow: 1;
  border: 1px solid black;
  border-radius: 3px;
  ${MEDIA_QUERY_MD}{
    font-size: 1.8rem;
    margin: .5rem 0 ;
    flex-grow: 0;
    width: 60%;
  }
`
const InputRadio = styled.input`
  ${MEDIA_QUERY_MD}{
    margin-right: .5rem;
    width: 1.5rem;
    height: 1.5rem;
  }
`
const InputNotice = styled.p`
  color: red;
  font-size: 1px;
  position: absolute;
  bottom: -1rem;
  ${(props) => props.$check && 'display none;'}

  ${MEDIA_QUERY_MD}{
    font-size: 1.2rem;
    bottom: 0;
  }
`
const SubmitButton = styled.input`
  width: 4rem;
  height: 1.5rem;
  background: #FAD312;
  border: none;
  border-radius: 3px;
  color: #000;
  &:hover{
    cursor: pointer;
  }
  ${MEDIA_QUERY_MD}{
    font-size: 1.8rem;
    width: 8rem;
    height: 3rem;
    margin-bottom: 1rem;
  }
`

export default function Form({
  check,
  handleChange,
  handleBlur,
  handleChangeType,
  handleSubmit
}) {
  return (
    <form>
      <InputBlock>
        <InputTitle htmlFor="name">暱稱<span>*</span></InputTitle>
        <InputField
        type="text"
        id="name"
        name="name"
        placeholder="你速隨"
        onChange={() => { handleChange('name') }}
        onBlur={() => { handleBlur('name') }}
        />
        <InputNotice $check={check.name}>請務必輸入暱稱</InputNotice>
      </InputBlock>

      <InputBlock>
        <InputTitle htmlFor="email">電子郵件<span>*</span></InputTitle>
        <InputField
        type="email"
        id="email"
        name="email"
        placeholder="伊媚兒"
        onChange={() => { handleChange('email') }}
        onBlur={() => { handleBlur('email') }}
        />
        <InputNotice $check={check.email}>看不懂中文膩？ *代表必填</InputNotice>
      </InputBlock>

      <InputBlock>
        <InputTitle htmlFor="phone">電話號碼<span>*</span></InputTitle>
        <InputField
        type="number"
        id="phone"
        name="phone"
        placeholder="給虧嗎"
        onChange={() => { handleChange('phone') }}
        onBlur={() => { handleBlur('phone') }}
        />
        <InputNotice $check={check.phone}>不留電話怎麼情話纏綿</InputNotice>
      </InputBlock>

      <InputBlock>
        <InputTitle >報名類型<span>*</span></InputTitle>
        <div>
          <div>
            <InputRadio
            type="radio"
            id="lay-back"
            name="type"
            value="躺在床上用想像力實作"
            onClick={handleChangeType}
            onBlur={() => { handleBlur('type') }}
            />
            <InputTitle htmlFor="lay-back">躺在床上用想像力實作</InputTitle>
          </div>
          <div>
            <InputRadio
            type="radio"
            id="lean-down"
            name="type"
            value="趴在地上滑手機找現成的"
            onClick={handleChangeType}
            onBlur={() => { handleBlur('type') }}
            />
            <InputTitle htmlFor="lean-down">趴在地上滑手機找現成的</InputTitle>
          </div>
        </div>
        <InputNotice $check={check.type}>是不會勾選膩</InputNotice>
      </InputBlock>

      <InputBlock>
        <InputTitle htmlFor="how">怎麼知道活動？<span>*</span></InputTitle>
        <InputField
        type="text"
        id="how"
        name="how"
        placeholder="從實招來"
        onChange={() => { handleChange('how') }}
        onBlur={() => { handleBlur('how') }}
        />
        <InputNotice $check={check.how}>拜託配合一下啦</InputNotice>
      </InputBlock>

      <InputBlock>
        <InputTitle htmlFor="others">其他<span> </span></InputTitle>
        <InputField
        type="text"
        id="others"
        name="others"
        placeholder="對活動的一些建議？"
        onChange={() => { handleChange('others') }}/>
      </InputBlock>

      <SubmitButton type="button" value="提交" onClick={handleSubmit}/>

    </form>
  )
}
