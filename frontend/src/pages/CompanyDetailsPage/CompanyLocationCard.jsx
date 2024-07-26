const CompanyLocationCard = (props) => {
    return ( 
        <>
            <li
                key={props.location.location_id}
                onClick={() => props.handleLocationClick(props.location)}
                className={
                  props.selectedLocation &&
                    props.selectedLocation.location_id === props.location.location_id
                    ? "selected-location"
                    : ""
                }
              >
                <h3>{props.location.name}</h3>
                <p>{props.location.address}</p>
              </li>
        </>
     );
}
 
export default CompanyLocationCard;