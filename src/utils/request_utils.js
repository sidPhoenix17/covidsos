import {CardText} from "reactstrap";
import React from "react";
import haversine from "haversine-distance";
import FormGroupTemplate from "../components/Forms/FormGroupTemplate";
import {
  FacebookIcon,
  FacebookShareButton, TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from "react-share";

export const getVolunteerOptionsFormByDistance = (volunteerList, reqLatitude, reqLongitude,
    selectedValue, onChangeFunc) => {
  const kmRadius = 1;
  const volunteerLists = volunteerList
  .filter(v => v.status === 1)
  .reduce((result, v) => {
    v.hd = haversine({lat: reqLatitude, lng: reqLongitude},
        {lat: v.latitude, lng: v.longitude});
    result[v.hd < kmRadius * 1000 ? 0 : 1].push(v);
    return result;
  }, [[], []]);
  const volunteerOptions = volunteerLists.map(list => {
    return list.sort((a, b) => a.hd - b.hd)
    .map(v => {
      return {
        value: v.v_id,
        label: v.name + ' (' + v.mob_number + ')'
            + ' ['
            + ((v.hd < 1000) ? (v.hd.toFixed(2) + ' m') : ((v.hd / 1000).toFixed(2) + ' km'))
            + ']'
      }
    })
  });
  return (
      <FormGroupTemplate iconClass="fas fa-hands-helping"
                         placeholder="Volunteer"
                         type="select"
                         optionGroupsArray={[
                           {
                             label: 'Within ' + kmRadius + ' km',
                             optionList: volunteerOptions[0]
                           },
                           {
                             label: 'More than ' + kmRadius + ' km',
                             optionList: volunteerOptions[1]
                           }]}
                         value={selectedValue}
                         onChange={onChangeFunc}/>
  );
}

export const displayRequestCardDetails = (title, content) => {
  return (
      <>
        <CardText className="text-gray text-custom-small mb-0">
          {title}
        </CardText>
        <CardText>{content || 'NA'}</CardText>
      </>
  )
}

export const getShareButtons = (accept_link = 'https://wa.me/918618948661/', helpText) => {
  return (
      <>
          <span className='share-icon'>
                <WhatsappShareButton
                    url={accept_link}
                    title={helpText}>
                  <WhatsappIcon size={32} round/>
                </WhatsappShareButton>
              </span>
        <span className='share-icon'>
                <FacebookShareButton
                    url={accept_link}
                    quote={helpText}>
                  <FacebookIcon size={32} round/>
                </FacebookShareButton>
              </span>
        <span className=''>
                <TwitterShareButton
                    url={accept_link}
                    title={helpText}>
                  <TwitterIcon size={32} round/>
                </TwitterShareButton>
              </span>
      </>
  );
}