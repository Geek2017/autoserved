import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Container, Row, Card, CardBody } from 'shards-react';

import PageTitle from '../components/common/PageTitle';
import getCalendarEventsData from '../data/autoserved-appointments-data';

class Appointments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null
    };
  }

  componentWillMount() {
    const events = getCalendarEventsData();
    this.setState({
      ...this.state,
      events
    });
  }

  render() {
    const { events } = this.state;
    const allViews = ['month', 'week', 'day', 'agenda'];
    const localizer = BigCalendar.momentLocalizer(moment);

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Appointments"
            subtitle="Schedule"
            className="text-sm-left mb-3"
          />
        </Row>
        <Card className="p-0">
          <CardBody className="py-4">
            <BigCalendar
              events={events}
              views={allViews}
              step={60}
              showMultiDayTimes
              defaultDate={new Date()}
              localizer={localizer}
              defaultView={BigCalendar.Views.AGENDA}
              selectable
            />
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default Appointments;
